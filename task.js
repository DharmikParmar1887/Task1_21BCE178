const mockData = [
    { id: 1, name: "Alice Johnson", status: "Active", date: "2022-01-15", active: true },
    { id: 2, name: "Bob Smith", status: "Inactive", date: "2020-06-30", active: false },
    { id: 3, name: "Charlie Rose", status: "Active", date: "2023-03-01", active: true },
    { id: 4, name: "David Green", status: "Inactive", date: "2018-11-20", active: true },
    { id: 5, name: "Eva White", status: "Active", date: "2021-05-15", active: true },
    { id: 6, name: "Frank Black", status: "Inactive", date: "2019-09-17", active: true },
    { id: 7, name: "Grace Brown", status: "Active", date: "2021-04-10", active: false },
    { id: 8, name: "Hank Green", status: "Active", date: "2017-03-25", active: true },
    { id: 9, name: "Ivy Blue", status: "Inactive", date: "2019-08-05", active: true },
    { id: 10, name: "Jack White", status: "Active", date: "2020-02-20", active: false },
    { id: 11, name: "Kara Black", status: "Active", date: "2018-12-12", active: true },
    { id: 12, name: "Leo Green", status: "Inactive", date: "2021-01-30", active: true },
    { id: 13, name: "Mona Blue", status: "Active", date: "2019-11-18", active: true },
    { id: 14, name: "Nina Brown", status: "Active", date: "2023-04-14", active: true },
    { id: 15, name: "Oscar White", status: "Inactive", date: "2016-05-11", active: true }
];

window.onload = function () {
    loadTableData(mockData);
};

function loadTableData(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.status}</td>
            <td>${item.date}</td>
            <td>${item.active}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function sortTable(columnIndex) {
    const table = document.getElementById("dataTable");
    const rows = Array.from(table.rows).slice(2);
    const type = table.rows[0].cells[columnIndex].dataset.type;
    const asc = table.rows[0].cells[columnIndex].classList.toggle("asc");

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].innerText;
        const bValue = b.cells[columnIndex].innerText;

        if (type === "integer") {
            return asc ? aValue - bValue : bValue - aValue;
        } else if (type === "string" || type === "enum") {
            return asc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (type === "date") {
            return asc ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
        } else if (type === "boolean") {
            return asc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });

    rows.forEach(row => table.tBodies[0].appendChild(row));
}

function applyIdFilter() {
    const intFilter = document.getElementById('intFilter').value;
    const intValue = document.getElementById('intValue').value;

    const filteredData = mockData.filter(item => {
        const id = item.id;
        switch (intFilter) {
            case 'equals': return id == intValue;
            case 'lt': return id < intValue;
            case 'lte': return id <= intValue;
            case 'gt': return id > intValue;
            case 'gte': return id >= intValue;
            case 'neq': return id != intValue;
            case 'range':
                const [min, max] = intValue.split('-').map(Number);
                return id >= min && id <= max;
            default: return true;
        }
    });

    loadTableData(filteredData);
}

function filterTable() {
    const stringFilter = document.getElementById('stringFilter').value.toLowerCase();
    const enumFilter = document.getElementById('enumFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const booleanFilter = document.getElementById('booleanFilter').value;

    const filteredData = mockData.filter(item => {
        const stringMatch = !stringFilter || item.name.toLowerCase().includes(stringFilter);
        const enumMatch = !enumFilter || item.status === enumFilter;
        const dateMatch = !dateFilter || item.date === dateFilter;
        const booleanMatch = !booleanFilter || item.active.toString() === booleanFilter;

        return stringMatch && enumMatch && dateMatch && booleanMatch;
    });

    loadTableData(filteredData);
}

document.getElementById('searchBar').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filteredData = mockData.filter(item => {
        return (
            item.id.toString().includes(query) ||
            item.name.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query) ||
            item.date.toLowerCase().includes(query) ||
            item.active.toString().includes(query)
        );
    });
    loadTableData(filteredData);
});





