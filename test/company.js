

process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
          
chai.use(chaiHttp);

baseUrl = 'test.tender.pro/api/_company.info_public.json';

describe('Компания:', () => {

   describe('Получение данных компании:', () => {

      describe('Положительный результат:', () => {

         // 01
         it('Данные компании должны находиться в поле result.data и содержать поля: \n' +
            '          address_legal, title_full, anno_short, rating, is_seller_pro, country_id, \n' +
            '          fax, is_type_seller, address, id, anno, type_name, country_name, phone, \n' +
            '          seller_type_name, kpp, inn, site, title', function (done) {
            params = '?id=29568';
            expectedCompany = {
               "success" : "true",
               "result" : {
                  "args" : {
                     "id" : "29568"
                  },
                  "data" : {
                     "address_legal" : "119034, Россия, Москва, Курсовой пер.,  8/2, стр. 2",
                     "title_full" : "Общество с ограниченной ответственностью \"РУССДРАГМЕТ\"",
                     "anno_short" : "Добыча золота",
                     "rating" : "2.000",
                     "is_seller_producer" : 1,
                     "country_id" : 1,
                     "fax" : "(495) 4249521",
                     "is_type_seller" : 1,
                     "address" : "109004, Россия, Москва, Станиславского, 21 , стр. 1 (эт. 4)",
                     "id" : 29568,
                     "anno" : "",
                     "type_name" : "участник",
                     "country_name" : "Россия",
                     "phone" : "(495) 4249521",
                     "seller_type_name" : "производитель",
                     "kpp" : "770401001",
                     "inn" : "7704246589",
                     "site" : "http://www.russdragmet.ru",
                     "title" : "Руссдрагмет"
                  }
               }
            };

            chai
               .request(baseUrl)
               .get(params)
               .end((err, res) => {
                  res.should.have.status(200);
                  company = JSON.parse(res.text);

                  company.should.be.eql(expectedCompany);

                  done();
            });
         });

      });

      describe('Отрицательный результат:', () => {

         // 02
         it('Если идентификатор компании не существует, то должно быть сообщение "нет данных"', function (done) {
            params = '?id=11111111';
            expectedError =
            {
              "success": "false",
              "result": {
                "error": [
                  {
                    "id": "_",
                    "message": "нет данных",
                    "code": "Y0010"
                  }
                ]
              }
            };

            chai
               .request(baseUrl)
               .get(params)
               .end((err, res) => {
                  res.should.have.status(200);
                  company = JSON.parse(res.text);

                  company.should.be.eql(expectedError);

                  done();
            });
         });

         // 03
         it('Если параметр отсутствует, то должно быть сообщение "Invalid params"', function (done) {
            params = '';
            expectedError =
            {
              "error": {
                "data": {
                  "note": "Invalid method parameter(s)."
                },
                "code": "-32602",
                "message": "Invalid params"
              }
            }

            chai
               .request(baseUrl)
               .get(params)
               .end((err, res) => {
                  res.should.have.status(200);
                  err = JSON.parse(res.text);

                   err.should.be.eql(expectedError);

                  done();
            });
         });

         // 04
         it('Если идентификатор компании не соответствует шаблону, то должно быть сообщение "значение не соответствует шаблону \"[знак]цифры\""', function (done) {
            params = '?id=abcd';
            expectedError =
            {
              "success": "false",
              "result": {
                "error": [
                  {
                    "id": "id",
                    "message": "значение не соответствует шаблону \"[знак]цифры\"",
                    "code": "Y0003"
                  }
                ]
              }
            }

            chai
               .request(baseUrl)
               .get(params)
               .end((err, res) => {
                  res.should.have.status(200);
                  err = JSON.parse(res.text);

                  err.should.be.eql(expectedError);

                  done();
            });
         });

         // 05
         it('Если идентификатор компании больше 2147483647, то должно быть сообщение "значение не соответствует условию \"Не больше 2147483647\""', function (done) {
            params = '?id=2147483648';
            expectedError =
            {
              "success": "false",
              "result": {
                "error": [
                  {
                    "id": "id",
                    "message": "значение не соответствует условию \"Не больше 2147483647\"",
                    "code": "Y0002"
                  }
                ]
              }
            }

            chai
               .request(baseUrl)
               .get(params)
               .end((err, res) => {
                  res.should.have.status(200);
                  err = JSON.parse(res.text);

                  err.should.be.eql(expectedError);

                  done();
            });
         });

         // 06
         it('Если идентификатор компании больше 2147483647, то должно быть сообщение "значение не соответствует условию \"Не меньше -2147483648\""', function (done) {
            params = '?id=-2147483649';
            expectedError =
            {
              "success": "false",
              "result": {
                "error": [
                  {
                    "id": "id",
                    "message": "значение не соответствует условию \"Не меньше -2147483648\"",
                    "code": "Y0002"
                  }
                ]
              }
            }

            chai
               .request(baseUrl)
               .get(params)
               .end((err, res) => {
                  res.should.have.status(200);
                  err = JSON.parse(res.text);

                  err.should.be.eql(expectedError);

                  done();
            });
         });


         // 07
         it('Минимальное значение для идентификатора компании должны быть -2147483648, должно быть сообщение "нет данных"', function (done) {
            paramsMin = '?id=-2147483648';
	    expectedError =
            {
              "success": "false",
              "result": {
                "error": [
                  {
                    "id": "_",
                    "message": "нет данных",
                    "code": "Y0010"
                  }
                ]
              }
            };

            chai
               .request(baseUrl)
               .get(paramsMin)
               .end((err, res) => {
                  res.should.have.status(200);
                  err = JSON.parse(res.text);
      
                  err.should.be.eql(expectedError);
      
                  done();
            });
         });

         // 08
         it('Максимальное значение для идентификатора компании должны быть 2147483647, должно быть сообщение "нет данных"', function (done) {
            paramsMax = '?id=2147483647';
	    expectedError =
            {
              "success": "false",
              "result": {
                "error": [
                  {
                    "id": "_",
                    "message": "нет данных",
                    "code": "Y0010"
                  }
                ]
              }
            };

            chai
               .request(baseUrl)
               .get(paramsMax)
               .end((err, res) => {
                  res.should.have.status(200);
                  err = JSON.parse(res.text);
   
                  err.should.be.eql(expectedError);

                  done();
            });
         });
      });
   });   
});   
