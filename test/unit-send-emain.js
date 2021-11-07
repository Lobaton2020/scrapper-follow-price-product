const assert = require("assert");
const expect =require('chai').expect
const { describe, it } = require("mocha");
const { checkSendEmail } = require("../src/services/mail");

describe("Correct funcion checkSendEmail",()=>{
    it("Should not send email result false, the money it is the same",()=>{
        const oldData = require("../data/data.json");
        const newData =   {
            link1 : [{
                title: 'Monitor LG 34 34wn80c-b Ultrawide Curvo Ips Hdr',
                price: '3.381.000',
                date: '2021-11-07T05:52:09.664Z'
            },
             {
                    title: 'Monitor LG 34 34wn80c-b Ultrawide Curvo Ips Hdr',
                    price: '2.381.000',
                    date: '2021-11-07T05:52:09.664Z'
             }],

            link2 :
            [{
                title: 'Monitor LG 34 34wn80c-b Ultrawide Curvo Ips Hdr',
                price: '3.302.708',
                date: '2021-11-07T05:52:09.664Z'
            }]
        };

        const result = checkSendEmail(oldData,newData);
        expect(result).equal(false)
    });


    it("Should not send email result false, the money it is the more high, more expensive",()=>{
        const oldData = require("../data/data.json");
        const newData =   {
            link1 : [{
                title: 'Monitor LG 34 34wn80c-b Ultrawide Curvo Ips Hdr',
                price: '2.381.000',
                date: '2021-11-07T05:52:09.664Z'
            }],

            link2 :
            [{
                title: 'Monitor LG 34 34wn80c-b Ultrawide Curvo Ips Hdr',
                price: '1.381.000',
                date: '2021-11-07T05:52:09.664Z'
            }]
        };

        const result = checkSendEmail(oldData,newData);
        expect(result).equal(false)
    });

    it("Should send email result true, the money it is cheaper",()=>{
        const oldData = require("../data/data.json");
        const newData =   {
                link1 : [{
                    title: 'Monitor LG 34 34wn80c-b Ultrawide Curvo Ips Hdr',
                    price: '181.000',
                    date: '2021-11-07T05:52:09.664Z'
                }],

                link2 :
                [{
                    title: 'Monitor LG 34 34wn80c-b Ultrawide Curvo Ips Hdr',
                    price: '1.381.000',
                    date: '2021-11-07T05:52:09.664Z'
                }]
            };

        const result = checkSendEmail(oldData,newData);
        expect(result).equal(true)
    });
})