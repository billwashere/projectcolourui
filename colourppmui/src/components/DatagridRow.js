
import React, {
    Fragment,
    isValidElement,
    cloneElement,
    createElement,
    useState,
    useEffect,
    useCallback,
    memo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TableCell, TableRow, Checkbox } from '@material-ui/core';
import { linkToRecord, useExpanded } from 'ra-core';
import isEqual from 'lodash/isEqual';

import DatagridCell from './DatagridCell';
import ExpandRowButton from './ExpandRowButton';
import { useHistory } from 'react-router-dom';

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

const computeNbColumns = (expand, children, hasBulkActions) =>
    expand
        ? 1 + // show expand button
          (hasBulkActions ? 1 : 0) + // checkbox column
          React.Children.toArray(children).filter(child => !!child).length // non-null children
        : 0; // we don't need to compute columns if there is no expand panel;

const defaultClasses = {};

const DatagridRow = ({
    basePath,
    children,
    classes = defaultClasses,
    className,
    expand,
    hasBulkActions,
    hover,
    id,
    onToggleItem,
    record,
    resource,
    rowClick,
    selected,
    style,
    selectable,
    arrHeaders,
    ...rest
}) => {
    const [expanded, toggleExpanded] = useExpanded(resource, id);
    const [nbColumns, setNbColumns] = useState(
        computeNbColumns(expand, children, hasBulkActions)
    );
    useEffect(() => {
        // Fields can be hidden dynamically based on permissions;
        // The expand panel must span over the remaining columns
        // So we must recompute the number of columns to span on
        const newNbColumns = computeNbColumns(expand, children, hasBulkActions);
        if (newNbColumns !== nbColumns) {
            setNbColumns(newNbColumns);
        }
    }, [expand, nbColumns, children, hasBulkActions]);

    const history = useHistory();

    const handleToggleExpand = useCallback(
        event => {
            toggleExpanded();
            event.stopPropagation();
        },
        [toggleExpanded]
    );
    const handleToggleSelection = useCallback(
        event => {
            onToggleItem(id);
            event.stopPropagation();
        },
        [id, onToggleItem]
    );
    const handleClick = useCallback(
        async event => {
            if (!rowClick) return;
            event.persist();

            const effect =
                typeof rowClick === 'function'
                    ? await rowClick(id, basePath, record)
                    : rowClick;
            switch (effect) {
                case 'edit':
                    history.push(linkToRecord(basePath, id));
                    return;
                case 'show':
                    history.push(linkToRecord(basePath, id, 'show'));
                    return;
                case 'expand':
                    handleToggleExpand(event);
                    return;
                case 'toggleSelection':
                    handleToggleSelection(event);
                    return;
                default:
                    if (effect) history.push(effect);
                    return;
            }
        },
        [
            basePath,
            history,
            handleToggleExpand,
            handleToggleSelection,
            id,
            record,
            rowClick,
        ]
    );

    return (
        <Fragment>
            <TableRow
                className={className}
                key={id}
                style={style}
                hover={hover}
                onClick={handleClick}
                {...rest}
            >
                {expand && (
                    <TableCell
                        padding="none"
                        className={classes.expandIconCell}
                    >
                        <ExpandRowButton
                            classes={classes}
                            expanded={expanded}
                            onClick={handleToggleExpand}
                            expandContentId={`${id}-expand`}
                        />
                    </TableCell>
                )}
                {hasBulkActions && true === false && (
                    <TableCell padding="checkbox">
                        {selectable && (
                            <Checkbox
                                color="primary"
                                className={`select-item ${classes.checkbox}`}
                                checked={selected}
                                onClick={handleToggleSelection}
                            />
                        )}
                    </TableCell>
                )}
                {React.Children.map(children, (field, index) =>
                    isValidElement(field) ? (
                        <DatagridCell
                            key={`${id}-${field.props.source || index}`}
                            className={classnames(
                                `column-${field.props.source}`,
                                classes.rowCell
                            )}
                            record={record}
                            {...{ field, basePath, resource }}
                        />
                    ) : null
                )}
                {arrHeaders.map(value => <td>{record.allocations ? record.allocations.filter(alloc => alloc.month === value).map(item => <Button
                  color={item.allocation > 1 ? "secondary" : "primary"}
                  component={Link}
                  to={{
                    pathname: "/allocation",
                    search: stringify({
                      page: 1,
                      perPage: 25,
                      sort: "id",
                      order: "DESC",
                      filter: JSON.stringify({ ids: item.id }),
                    }),
                  }}
                >
                  {item ? item.allocation.toFixed(2) : "No Alloc"}
                </Button>)[0] : 0}</td>)

                }
            </TableRow>
            {expand && expanded && (
                <TableRow key={`${id}-expand`} id={`${id}-expand`}>
                    <TableCell colSpan={nbColumns}>
                        {isValidElement(expand)
                            ? cloneElement(expand, {
                                  record,
                                  basePath,
                                  resource,
                                  id: String(id),
                              })
                            : createElement(expand, {
                                  record,
                                  basePath,
                                  resource,
                                  id: String(id),
                              })}
                    </TableCell>
                </TableRow>
            )}
        </Fragment>
    );
};

DatagridRow.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    id: PropTypes.any,
    onToggleItem: PropTypes.func,
    record: PropTypes.object.isRequired,
    resource: PropTypes.string,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    selected: PropTypes.bool,
    style: PropTypes.object,
    selectable: PropTypes.bool,
};

DatagridRow.defaultProps = {
    hasBulkActions: false,
    hover: true,
    record: {},
    selected: false,
    selectable: true,
};

const areEqual = (prevProps, nextProps) => {
    const { children: _, ...prevPropsWithoutChildren } = prevProps;
    const { children: __, ...nextPropsWithoutChildren } = nextProps;
    return isEqual(prevPropsWithoutChildren, nextPropsWithoutChildren);
};

export const PureDatagridRow = memo(DatagridRow, areEqual);

PureDatagridRow.displayName = 'PureDatagridRow';

export default DatagridRow;