const fs = require('fs');
const { getDataFromDB } = require('../services/scrapper');
const showDataOrdered = async(req,res)=>{
    let data =  getDataFromDB();
    Object.entries(data).forEach(([key,value])=>{
        data[key] = value.map((all)=> ({
            ...all,
            date: new Date(all.date).toLocaleString()
        }));
    });
    return res.render('scrapper', { data});
};

const showDataTables = async(req,res)=>{
    let data =  getDataFromDB();
    Object.entries(data).forEach(([key,value])=>{
        data[key] = value.map((all)=> ({
            ...all,
            date: new Date(all.date).toLocaleString()
        }));
    });
    return res.render('scrapper-table.hbs', { data});
};

module.exports = {
    showDataOrdered,
    showDataTables
}