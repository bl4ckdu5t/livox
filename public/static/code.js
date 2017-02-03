'use strict';

$('.delete').click(function (e) {
    $(this)
        .parent()
        .addClass('is-hidden');
});

function dataToOption(data) {
    return $('<option value="' + data + '">' + data + '</option>');
}

function selectList(list, node) {
    node.append(list.map(dataToOption));
}

selectList(Object.keys(states), $('#state-list'));
selectList(states['Abia'], $('#lga-list'));


$('#state-list').change(function () {
    selectList(states[this.value], $('#lga-list'));
});


selectList(Object.keys(zones), $('#zone-list'));
selectList(zones['A'], $('#school-list'));


$('#zone-list').change(function () {
    selectList(zones[this.value], $('#school-list'));
});



function fileSize(file) {
    return file.size / 1000;
}


$('.passport-src').change(function () {
    var file = this.files[0];
    if (file) {
        if (fileSize(file) <= 50) {
            var fileUrl = URL.createObjectURL(file);
            var reader = new FileReader();
            reader.onload = function(){
                $('.image')
                    .removeClass('is-hidden')
                    .find('img')
                    .attr('src', reader.result);
                $('#passport').val(reader.result);
                $('.uploader .help').addClass('is-hidden');
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            this.files = null;
            this.value = null;
            $('.uploader .help').removeClass('is-hidden');
        }
    }
});
