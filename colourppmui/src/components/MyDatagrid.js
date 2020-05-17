import React, {
    isValidElement,
    Children,
    createElement,
    useCallback,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { DatagridHeaderCell, DatagridBody, DatagridLoading, FieldTitle } from 'react-admin';
import MyDatagridBody from './MyDatagridBody'

const useStyles = makeStyles(
    theme => ({
        table: {
            tableLayout: 'auto',
        },
        thead: {},
        tbody: {},
        headerRow: {},
        headerCell: {
            position: 'sticky',
            top: 0,
            zIndex: 2,
            backgroundColor: theme.palette.background.paper,
        },
        checkbox: {},
        row: {},
        clickableRow: {
            cursor: 'pointer',
        },
        rowEven: {},
        rowOdd: {},
        rowCell: {},
        expandHeader: {
            padding: 0,
            width: theme.spacing(6),
        },
        expandIconCell: {
            width: theme.spacing(6),
        },
        expandIcon: {
            padding: theme.spacing(1),
            transform: 'rotate(-90deg)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expanded: {
            transform: 'rotate(0deg)',
        },
    }),
    { name: 'RaDatagrid' }
);


//https://stackoverflow.com/questions/59085335/how-to-add-sum-row-in-react-admin-datagrid
const MyDatagrid = props => {
    const classes = useStyles(props);
    const {
        basePath,
        children,
        currentSort,
        data,
        hover,
        ids,
        loading,
        loaded,
        onSelect,
        onToggleItem,
        resource,
        rowClick,
        rowStyle,
        selectedIds,
        setSort,
        total,
        version,
        hasBulkActions,
        size,
        classes: classesOverride,
        className,
        expand,
        ...rest 
    } = props

    /**
     * Define the aggregation logic by field here
     */
    const getTotalForField = field => {
        // something like
        return ids.map(id => data[id][field]).reduce((acc, curr) => acc + curr);
    }

    // the rest of the code is loosely copied from react-admin's Datagrid component source, simplified for comprehension

    const updateSort = useCallback(
        event => {
            event.stopPropagation();
            setSort(event.currentTarget.dataset.sort);
        },
        [setSort]
    );

    const handleSelectAll = useCallback(
        event => {
            if (event.target.checked) {
                onSelect(
                    ids.concat(selectedIds.filter(id => !ids.includes(id)))
                );
            } else {
                onSelect([]);
            }
        },
        [ids, onSelect, selectedIds]
    );

    if (loaded === false) {
        return (
            <DatagridLoading
            classes={classes}
            className={className}
            expand={expand}
            hasBulkActions={hasBulkActions}
            nbChildren={React.Children.count(children)}
            size={size}
        />
        );
    }

    if (loaded && (ids.length === 0 || total === 0)) {
        return null;
    }

    if(!data) return null;
    const headers = new Set()
    for ( let key in data ) {
        if(data[key].allocations)
            data[key].allocations.forEach(alloc => headers.add(alloc.month));
    }
    const arrHeaders = [...headers];

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {Children.map(children, (field, index) => (
                        <DatagridHeaderCell
                            currentSort={currentSort}
                            field={field}
                            isSorting={
                                currentSort.field ===
                                (field.props.sortBy || field.props.source)
                            }
                            key={field.props.source || index}
                            resource={resource}
                            updateSort={updateSort}
                        />
                    ))}
                    {arrHeaders.map(month => (
                         <TableCell
                         
                        
                         variant="head"
                         
                     >
                        <FieldTitle
                    label={month}
                    source={month}
                    resource={resource}
                />
                         </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            {createElement(
                MyDatagridBody,
                {
                    basePath,
                    classes,
                    expand,
                    rowClick,
                    data,
                    hasBulkActions,
                    hover,
                    ids,
                    onToggleItem,
                    resource,
                    rowStyle,
                    selectedIds,
                    version,
                    arrHeaders
                },
                children
            )}
            
            <tfoot>
                <tr>
                  
                </tr>
            </tfoot>
        </Table>
    );
}

MyDatagrid.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    selectedIds: [],
};

export default MyDatagrid;