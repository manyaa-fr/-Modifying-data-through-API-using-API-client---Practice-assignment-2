const {connect} = require('mongoose')

const connectToDb = async(url) => {
    try{
        connect(url)
        console.log('Connected to database')
    }
    catch(error){
        console.log('Error in connection')
    }
}

module.exports = connectToDb