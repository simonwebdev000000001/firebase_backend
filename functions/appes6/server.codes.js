const ERROR_CODES = {
    NOT_LOGIN: 1,
    SYNTAX:2,
    BAD_CREATE:4,
    BAD_UPDATE:5,
    BAD_DELETE:6,
    BAD_READ:7,
    
    NOT_AUTH:8,
    MISSING_FIELD:3
}

module.exports={
    ERROR_CODES,
    RESPONCE_STATUS:{
        SUCCESS:200,
        BAD_REQUEST:401
    }
}