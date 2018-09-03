const sql = require('mssql')

// Connection string from ENVIRONMENT, like 'mssql://username:password@localhost/database'
let connectionPoolConfig = {
    user: 'CMR_TEST',
    password: 'Password411',
    server: '209.0.188.40',  
    database: 'CMR_TEST',
    options: {
        encrypt: false 
    }
}
let connectionPoolPromise = null
let connectionPoolObj = null

let getOrCreatePool = async () => {
	if (connectionPoolObj) {
		return connectionPoolObj
	} else if (!connectionPoolPromise) {
		connectionPoolPromise = new sql.ConnectionPool(connectionPoolConfig).connect()
	}
	connectionPoolObj = await connectionPoolPromise
	return connectionPoolObj
}

let query = async(sql) => {
	const pool = await getOrCreatePool()
	console.log(sql);
    try {
    	return await pool.request().query(sql)
    } catch(err) {
    	console.error('Query error', err);
    	return null;
    }
}

let storedProcedure = async (params, storedProcedureName) => {
	const pool = await getOrCreatePool()
	let request = await pool.request()
	params.forEach((parameter) => {
		parameterDirection = parameter.isOutput ? 'output' : 'input';
		request = request[parameterDirection](parameter.name, parameter.type, parameter.value)
	});
	try {
		return await request.execute(storedProcedureName)
		sql.on('error', err => {
			console.log('Sql Error')
			// ... error handler
		})
    } catch(err) {
		console.error('StoredProcedure error');
		return err
    }
}



module.exports = {
	query: query,
	storedProcedure: storedProcedure
}