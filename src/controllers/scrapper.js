const fs = require('fs');
const { getDataFromDB } = require('../services/scrapper');

const showDataOrdered = async(req,res)=>{
    let data =  getDataFromDB();
    const info = Object.entries(data).map(([key,value])=>{
        return [
            key,
            value.map((all)=> ({
                ...all,
                date: new Date(all.date).toLocaleString()
            }))
        ];
    });
    return res.render('scrapper', { data: info});
};

const showDataJson = async(req,res)=>{
    let data =  getDataFromDB();
    const info = Object.entries(data).map(([key,value])=>{
        return [
            key,
            value.map((all)=> ({
                ...all,
                date: new Date(all.date).toLocaleString(),
                dateorder: new Date(all.date).getTime()
            }))
        ];
    });
    return res.json(info);
};

module.exports = {
    showDataOrdered,
    showDataJson
}