let contentType = document.getElementById('contentType');
contentType.style.display = 'none';

let get = document.getElementById('get');
get.addEventListener('click', (e) => {
    contentType.style.display = 'none';
})
let post = document.getElementById('post');
post.addEventListener('click', (e) => {
    contentType.style.display = 'block';
})

// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})



// Initialize no of parameters
let addedParamCount = 1;
// Utility functions:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
// If the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 1}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 1}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 1}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                </div>`;
    // Convert the element string to DOM no
    // let paramElement = document.createElement('div');
    // paramElement.innerHTML = string;
    let paramElement = getElementFromString(string); // A L S O, this alternative for above

    params.appendChild(paramElement);

    // Below function FOR CHILD element will be created only after the PARENT function's call
    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    // console.log(`deleteParam contains : `, deleteParam); // stores all buttons with id=deleteParam in ARRAY
    for (item of deleteParam) {
        // creates item.addEventListener() for every item
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            // console.log(`e.target : `, e.target);
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

{/*--------------------------------------------------------------------------------------------------------------*/ }

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    // Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                // console.log(`key : `, key);
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                // console.log(`value : `, value);
                data[key] = value;
                // console.log(`data[key] : `, data[key]);
            }
        }
        // console.log(`data : `, data);
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    {
        // Log all the values in the console for debugging
        // console.log('URL is ', url);
        // console.log('requestType is ', requestType);
        // console.log('contentType is ', contentType);
        // console.log('data is ', data);
    }
    // if the request type is  G E T , invoke fetch api to create a  G E T  request
    if (requestType == 'GET') {
        fetch(url, /*options*/ {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });

    }

    else { //P O S T  R E Q U E S T 
        fetch(url, /*options*/{
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });

    }
});