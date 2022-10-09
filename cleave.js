var cleave = new Cleave('.tarih', {
    date: true,
    datePattern: ['m', 'y']
});

var cleave = new Cleave('.card-number', {
    delimiter: ' ',
    blocks: [4, 4, 4, 4],
    numericOnly: true
})

$('body').on('keypress','.phone', function (e){
    if(e.currentTarget.value.length == 2 && e.keyCode !== 53 && e.keycode !== 101){
        e.preventDefault();
    }
})

