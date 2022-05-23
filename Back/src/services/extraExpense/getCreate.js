import db from '../../database/models/index';


const getCreate = async (body) => {

  if (body.expense) {
    for (let index = 0; index < body.expense.length; index++) {
      console.log(body.expense.length)
      await db.appExtraExpense
        .create({
          description: body.expense[index].description,
          price: body.expense[index].price,
          idRoute: body.expense[index].idRoute
        })
        .then((data) => {
          console.log(data)
        })
        .catch((e) => {
          console.log(e);
        });

    }
    return body.expense


  } else {
    return "Error al enviar los gastos"
  }

}

module.exports = {
  getCreate
}