$(function () {
    var actualMonth = document.getElementById("actualMonth");

    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const d = new Date();
    var indexMonth = d.getMonth();
    let name = month[indexMonth];
    actualMonth.textContent = name;
    getGeneralData(indexMonth + 1);
    getGeneralTotalData();

    $("a[id=previusBtn]").on("click", function () {
        if (indexMonth > 0) {
            indexMonth -= 1;
            let name = month[indexMonth];
            actualMonth.textContent = name;
            getGeneralData(indexMonth + 1)
        }
    })
    $("a[id=nextBtn]").on("click", function () {
        if (indexMonth < 11) {
            indexMonth += 1;
            let name = month[indexMonth];
            actualMonth.textContent = name;
            getGeneralData(indexMonth + 1)
        }
    })

    function getGeneralData(month) {
        fetch("http://3.93.67.74:3002/api/sale/infoSale", {
            method: "POST", headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                month: month,
                year: new Date().getFullYear()
            })
        }).then(response => response.json())
            .then(data => {
                var totalSale = document.getElementById("totalSale");
                var totalCountSale = document.getElementById("totalCountSale");
                var totalDeposit = document.getElementById("totalDeposit");
                var routesCount = document.getElementById("routesCount");
                totalSale.textContent = data.data.totalValueSale;
                totalCountSale.textContent = data.data.totalNumberSale;
                totalDeposit.textContent = data.data.totalValueDeposit;
                routesCount.textContent = data.data.totalNumberRoutes;
            }).catch(e => console.log(e));
    }

    function getGeneralTotalData() {
        fetch("http://3.93.67.74:3002/api/sale/infoSale", {
            method: "POST"
        }).then(response => response.json())
            .then(data => {
                var totalTotalSale = document.getElementById("totalTotalSale");
                var totalTotalCountSale = document.getElementById("totalTotalCountSale");
                var totalTotalDeposit = document.getElementById("totalTotalDeposit");
                var totalRoutesCount = document.getElementById("totalRoutesCount");
                totalTotalSale.textContent = data.data.totalValueSale;
                totalTotalCountSale.textContent = data.data.totalNumberSale;
                totalTotalDeposit.textContent = data.data.totalValueDeposit;
                totalRoutesCount.textContent = data.data.totalNumberRoutes;
            }).catch(e => console.log(e));
    }
})