const Create = () => {
    console.log('Huu du');
};

const renderRow = (row, index) => `<tr><td>${index}</td><td>${row.name}</td><td>${row.name}</td><td>${row.name}</td><td>${row.name}</td></tr>`

export { Create, renderRow }