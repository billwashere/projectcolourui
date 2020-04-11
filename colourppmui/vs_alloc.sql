CREATE OR REPLACE VIEW "public"."vw_d_allocation" AS 
 SELECT a.id,
    a.start_date,
    a.end_date,
    a.allocation,
    a.deleted,
    a.created,
    a.updated,
    a.entity_id,
    a.commitment,
    a.version,
    a.entityb_id,
    d.date_dim_id,
    d.date_actual,
    d.epoch,
    d.day_suffix,
    d.day_name,
    d.day_of_week,
    d.day_of_month,
    d.day_of_quarter,
    d.day_of_year,
    d.week_of_month,
    d.week_of_year,
    d.week_of_year_iso,
    d.month_actual,
    d.month_name,
    d.month_name_abbreviated,
    d.quarter_actual,
    d.quarter_name,
    d.year_actual,
    d.first_day_of_week,
    d.last_day_of_week,
    d.first_day_of_month,
    d.last_day_of_month,
    d.first_day_of_quarter,
    d.last_day_of_quarter,
    d.first_day_of_year,
    d.last_day_of_year,
    d.mmyyyy,
    d.mmddyyyy,
    d.weekend_indr,
        CASE
            WHEN (d.day_of_week >= 6) THEN NULL::interval
            ELSE (c.default_duration * (a.allocation)::double precision)
        END AS default_duration,
    lc.cost,
    lc.currency,
    lc.id AS loaded_cost_id,
    ((
        CASE
            WHEN (d.day_of_week >= 6) THEN NULL::interval
            ELSE c.default_duration
        END * (a.allocation)::double precision) * (lc.cost)::double precision) AS allocated_cost
   FROM ((((allocation a
     JOIN entity eb ON ((eb.id = a.entityb_id)))
     JOIN d_date d ON (((d.date_actual >= a.start_date) AND (d.date_actual <= a.end_date))))
     LEFT JOIN loaded_cost lc ON (((d.date_actual >= lc.start_date) AND (d.date_actual <= COALESCE(lc.end_date, ( SELECT max(d_date.date_actual) AS max
           FROM d_date))) AND (a.entityb_id = lc.entity_id) AND ((lc.level = 0) OR (lc.level IS NULL)))))
     JOIN LATERAL ( SELECT config.default_duration
           FROM config) c ON (true))
  WHERE ((lc.deleted <> true) AND (eb.entity_type_id IN ( SELECT entity_type.id
           FROM entity_type
          WHERE (entity_type.is_resource = true))))
UNION ALL
 SELECT a.id,
    a.start_date,
    a.end_date,
    a.allocation,
    a.deleted,
    a.created,
    a.updated,
    a.entity_id,
    a.commitment,
    a.version,
    eb2.id AS entityb_id,
    d.date_dim_id,
    d.date_actual,
    d.epoch,
    d.day_suffix,
    d.day_name,
    d.day_of_week,
    d.day_of_month,
    d.day_of_quarter,
    d.day_of_year,
    d.week_of_month,
    d.week_of_year,
    d.week_of_year_iso,
    d.month_actual,
    d.month_name,
    d.month_name_abbreviated,
    d.quarter_actual,
    d.quarter_name,
    d.year_actual,
    d.first_day_of_week,
    d.last_day_of_week,
    d.first_day_of_month,
    d.last_day_of_month,
    d.first_day_of_quarter,
    d.last_day_of_quarter,
    d.first_day_of_year,
    d.last_day_of_year,
    d.mmyyyy,
    d.mmddyyyy,
    d.weekend_indr,
        CASE
            WHEN (d.day_of_week >= 6) THEN NULL::interval
            ELSE (c.default_duration * (a.allocation)::double precision)
        END AS default_duration,
    lc.cost,
    lc.currency,
    lc.id AS loaded_cost_id,
    ((
        CASE
            WHEN (d.day_of_week >= 6) THEN NULL::interval
            ELSE c.default_duration
        END * (a.allocation)::double precision) * (lc.cost)::double precision) AS allocated_cost
   FROM ((((((allocation a
     JOIN entity eb ON ((eb.id = a.entityb_id)))
     JOIN assoication ass ON ((ass.entitya_id = eb.id)))
     JOIN entity eb2 ON ((eb2.id = ass.entityb_id)))
     JOIN d_date d ON (((d.date_actual >= a.start_date) AND (d.date_actual <= a.end_date))))
     LEFT JOIN loaded_cost lc ON (((d.date_actual >= lc.start_date) AND (d.date_actual <= COALESCE(lc.end_date, ( SELECT max(d_date.date_actual) AS max
           FROM d_date))) AND (eb2.id = lc.entity_id) AND ((lc.level = 0) OR (lc.level IS NULL)))))
     JOIN LATERAL ( SELECT config.default_duration
           FROM config) c ON (true))
  WHERE ((lc.deleted <> true) AND (eb.entity_type_id IN ( SELECT entity_type.id
           FROM entity_type
          WHERE (entity_type.is_resource <> true))));