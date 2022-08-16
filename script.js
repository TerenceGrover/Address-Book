// Initializing the Contact class to add contacts to the list
class Contact{
    constructor(surname, lastname, number, address, picture){
        this.surname = surname
        this.lastname = lastname
        this.number = number
        this.address = address
        this.picture = picture
    }
}

// Generating examples to interact with at launch
let ex1 = new Contact('Terence','Grover','0033630618122','Monaco',NaN)
let ex2 = new Contact('Lo','Grover','0033630618122','Canada',NaN)
let ex3 = new Contact('Pierre','Boigues','0033639180956','France',NaN)
let ex4 = new Contact('Thomas','Cailteux','0033630718232','Italy',NaN)
//Array containing my contacts
let contacts = [ex1,ex2,ex3,ex4]
//Initializing contact variables
let [surname,lastname,number,address, picture] = ['','','','']

// Function that needs to be called for jquery for some reason
$(document).ready(function() {

    //Opted for a '+=' method here with innerHTML as I thought it was the easiest
    function add(contact){
        $('#contacts').html(`${$('#contacts').html()}
            <div class="contact" id="${contacts.indexOf(contact)}">
                <div class="delcontact">&times;</div>
                <img class="image" src="https://studentsgowest.com/wp-content/uploads/default-profile-image-png-1-Transparent-Images.png" alt="img">
                <hr>
                <div class="text">
                    <span class="surname">${contact.surname}</span>
                    <span class="name">${contact.lastname}</span>
                    <span class="number">${contact.number}</span>
                    <span class="address">${contact.address}</span>
                </div>
                <i class='phone call fa fa-phone'></i>
                <i class='phone message fa fa-commenting'></i>
            </div>`)
    }

    //Loading the contact list when asked. List arg allows for the search box to create new array
    function load(list){
        $('#contacts').html(``)
        list.forEach(element => {
            if(contacts.includes(element)){
                add(element)
            }
        })
        // Here I had to put in the delete buttons within the load function otherwise
        // everytime the contacts would reload, the buttons would loose functionality
        $('.delcontact').click(function(){
            contacts.splice($(this).parent().attr('id'),1)
            load(list)
            $('.delcontact').css({transform: 'scale(1) rotate(1turn)'})
        })
        $('.phone').click(()=>{
            alert('Phone Action')
        })
    }

// HANDLING THE MODAL POP-UP THAT WILL SERVE AS INPUT

    function disappear(){
        $('#popup').css({transform: 'translate(-50%,-50%) scale(0)'})
        $('#grey').css({display: 'none'})
    }
    function appear(){
        $('#popup').css({transform: 'translate(-50%,-50%) scale(1)'})
        $('#grey').css({display: 'block'})
    }
    function clearfields(){
        $('.inputfield').each(function() {$(this).val('')})
    }

    $('#add').click(()=>{
        appear()
    })
    $('#closebutton').click(()=>{
        disappear()
        clearfields()
    })
    $('#grey').click(()=>{
        disappear()
        clearfields()
    })

    // HANDLING THE INPUT OF THE MODAL TO CREATE NEW CONTACTS

    $('#submit').click(()=>{
        number = $('#numberinput').val()
        surname = $('#surnameinput').val()
        lastname = $('#nameinput').val()
        address = $('#addressinput').val()
        if(number != '' && surname != '' ){
            contacts.push(new Contact(surname,lastname,number,address,NaN))
            disappear()
            clearfields()
            load(contacts)
        }
    })

    // Here I opted for a continuous search as iPhones do. I prefer it to a button
    $('#search').on('input',()=>{
        let arr = contacts.filter(x => {
            if(x.surname.toLowerCase().includes($('#search').val())||x.lastname.toLowerCase().includes($('#search').val())||x.number.toLowerCase().includes($('#search').val())){
                return x
            }
        })
        // Deactivated the capacity to add contacts while searching to prevent bugs
        if($('#search').val() != ''){
            $('#add').prop('disabled', true)
        }else{
            $('#add').prop('disabled', false)
        }
        load(arr)
    })

    //Loading the initial batch of contacts
    load(contacts)

    // Making the delete buttons appear and do their task with a nice transition with a 'switch'

    $('#del').click(()=>{
        if($('#del').css('color') == 'rgb(255, 0, 0)'){
            ($('#del').css({color : 'black'}))
            $('.delcontact').css({transform: 'scale(1) rotate(1turn)'})
            $('#del').text('CANCEL')

        }else if($('#del').css('color') == 'rgb(0, 0, 0)'){
            ($('#del').css({color : 'red'}))
            $('.delcontact').css({transform: 'scale(0) rotate(0turn)'})
            $('#del').text('Delete ?')

        }
    })

})

// I could have added more functionalities such as flags that appear based on the phone code
// or adding a picture but that would have required a database and an actual backend.
// Those are skills that I am looking forward to learning.