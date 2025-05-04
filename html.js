const html = `
<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Usuarios</title>
            <style>
                li a{
                    color: black;
                }
                li a:hover{
                    color: darkred;
                    font-weight: bold;
                    cursor: pointer;
                }
                form{
                    width: max-content;
                    border: 2px solid black;
                    border-radius: 15px;
                    padding: 20px;
                }
                input{
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
    `

module.exports = html