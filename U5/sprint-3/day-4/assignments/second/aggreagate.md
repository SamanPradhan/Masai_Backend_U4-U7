1. ans for first one is

db.ordersDatas.aggregate([ { $match: { timestamp: { $gte: ISODate("2019-01-01T00:00:00Z"), $lte: ISODate("2021-12-31T23:59:59Z") } } }, { $unwind: "$items" }, { $group: { _id: { year: { $year: "$timestamp" }, country: "$country" }, total_items: { $sum: "$items.quantity" }, unique_customers: { $addToSet: "$customer_id" } } }, { $project: { _id: 0, year: "$\_id.year", country: "$_id.country", avg_items_per_customer: { $divide: ["$total_items", { $size: "$unique_customers" }] } } } ])

2.  db.salesData.aggregate([ { $project: { quarter: { $concat: [ "Q", { $substr: [ { $ceil: { $divide: [{ $month: "$transaction_date" }, 3] } }, 0, -1 ] } ] }, category: 1, total_price: { $multiply: ["$quantity", "$price"] } } }, { $group: { _id: { quarter: "$quarter", category: "$category" }, total_revenue: { $sum: "$total_price" } } }, { $project: { _id: 0, quarter: "$\_id.quarter", category: "$\_id.category", total_revenue: 1 } } ])

3.

4.

db.inventoriesData.aggregate([ { $match: { quantity: { $gt: 0 },  { $project: { product_id: 1, warehouse_id: 1, year: { $year: "$timestamp" }, value: { $multiply: ["$quantity", "$unit_price"] } } }, { $group: { _id: { product_id: "$product_id", warehouse_id: "$warehouse_id", year: "$year" }, total_value: { $sum: "$value" } }} }} ])

5.

db.salesData.aggregate([ { $match: { transaction_date: { $gte: ISODate("2019-01-01T00:00:00Z"), $lte: ISODate("2021-12-31T23:59:59Z") } } }, { $project: { category: 1, quarter: { $ceil: { $divide: [{ $month: "$transaction_date" }, 3] } }, revenue: { $multiply: ["$quantity", "$price"] } } }, { $group: { _id: { category: "$category", quarter: "$quarter" }, total_revenue: { $sum: "$revenue" } } }])
