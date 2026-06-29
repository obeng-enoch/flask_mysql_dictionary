$(document).ready(function() {
    $('#myModal').modal('show');
    $('#word-form').hide();
    $('#logo-form').hide();
    $('.edit-word, .edit-meaning').hide();
    $('.submit, .cancel').parent().hide();

    $('#word-index').on('click', function() {
        location.reload();
    });

    // Create Operation
    $('#word-add').on('click', function() {
        $('#word-index, #logo-add').removeClass('side-active');
        $(this).addClass('side-active');
        $('#word-form').show();
        $('#logo-form').hide();
    });

    $('#word-form').on('submit',function(event) {
        event.preventDefault();
        
        const word = $('#word').val();
        const meaning = $('#meaning').val();

        $.ajax({
            url: '/word',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                'word': word,
                'meaning': meaning
            }),
            contentType:'application/json; charset=UTF-8',
            success: function() {
                location.reload();
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

     $('#cancel').click(function() {
        location.reload();
    })
    
    // logo Operation

    $('#logo-add').on('click', function() {
        $('#word-index, #word-add').removeClass('side-active');
        $(this).addClass('side-active');
        $('#word-form').hide();
        $('#logo-form').show();
    });

     $('#logo-cancel').click(function() {
        location.reload();
    });

    $('#logo-form').on('submit',function(event) {
        event.preventDefault();
        let data =new FormData();
        data.append('file', $('#logo')[0].files[0]);

        $.ajax({
            url: '/add_logo',
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            success: function(data) {
                location.reload();
            },
            error: function(err) {
                console.log(err);
            }
        });
    });


    // Delete Operation
    $(document).on('click', '.delete', function() {
        const word_id = $(this).data('id');

        $.ajax({
            url: '/word/' + word_id + '/delete',
            type: 'POST',
            success: function() {
                location.reload();
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    // Update Operation
    $('.edit').click(function() {
        let parent = $(this).parents('tr');
        parent.find('.edit-word, .edit-meaning').show();
        parent.find('.word-word, .word-meaning').hide();
        parent.find('.submit, .cancel').parent().show();
        parent.find('.edit, .delete').parent().hide();
    });

    $('.cancel').click(function() {
        location.reload();
    })

    $('.update-form').submit(function() {
        let parent = $(this).parents('tr');
        let word = parent.find('input').val();
        let meaning = parent.find('textarea').val();
        let word_id = parent.find('.submit').data('id');

        $.ajax({
            url: '/word/' + word_id + '/edit',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                'word': word,
                'meaning': meaning
            }),
            contentType: 'application/json; charset=UTF-8',
            success: function() {
                location.reload();
            },
            error: function(err) {
                console.log(err);
            }
        });
    })
});