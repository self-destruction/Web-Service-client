var PROTO_PATH = __dirname + '/proto/credit.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
var credit_proto = grpc.loadPackageDefinition(packageDefinition).credit;

function main() {
  var client = new credit_proto.Credit('localhost:50051', grpc.credentials.createInsecure());
  let obj = {
    user: {
      surname: 'Сырчиков',
      name: 'Максим',
      patronymic: 'Сергеевич',
      age: 22
    }
  };
    
  client.GetBankAnswer(obj, function(err, response) {
    try{
      let approveStatus;
      if (response.approved) {
        approveStatus = 'Одобрено.'
      } else {
        approveStatus = 'Отказано.'
      }
      console.log('Статус:', approveStatus);
      console.log('Текст ответа:', response.message);
    } catch(e) {
      console.log("Сервер недоступен. Извините за технические неудобства!");
    }
  });
}

main();