import pool from './db.pool.js';

const requireTransactionMap = {
    POST: true,
    PUT: true,
    DELETE: true,
}

const connectDatabase = async (req,res,next) => {
    // resolve db client
    let dbClient = null;
    try {
        dbClient = await pool.connect();
        req.dbClient = dbClient;
        req.doTransaction = requireTransactionMap[req.method] === true; 
        if (req.doTransaction) {
            await req.dbClient.query('BEGIN');
        }
        console.info('database connected');
        next();
    } catch (err) {
        res.status(503).end();
        next(err);
    }
}

const commitDatabase = async (req,_res,next) => {
    if (req.doTransaction) {
        await req.dbClient.query('COMMIT');
    }
    req.dbClient.release();
    req.dbClient = undefined;
    req.doTransaction = undefined;
    console.info('database disconnected');
    next();
}

const rollbackDatabase = async (err, req, res, next) => {
    if (req.doTransaction && req.dbClient){
        console.info('rollback transaction!');
        await req.dbClient.query('ROLLBACK');
        req.dbClient.release();
        req.dbClient = undefined;
        req.doTransaction = undefined;
    }
    console.info('--- ERROR ---');
    console.error(err);
    // need a way to detect app error from system error
    let errorCode = 500;
    if (err.isApplicationError === true) {
        errorCode = err.errorCode;
    }
    res.status(errorCode).json({
        error: err.message || "Cant process your request",
    });
    next();
}

export {
    connectDatabase,
    commitDatabase,
    rollbackDatabase
};