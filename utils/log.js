const $output = document.createElement('div');
$output.classList.add('output');
const $pre = document.createElement('pre');
$pre.classList.add('pre');
$output.append($pre);
document.body.appendChild($output);

// Reference to native method(s)
var oldLog = console.log;

console.log = function( ...items ) {

    // Call native method first
    oldLog.apply(this, items);

    // Use JSON to transform objects, all others display normally
    items.forEach((item, i)=>{
        items[i] = (typeof item === 'object' ? JSON.stringify(item,null,4) : item);
    });
    $pre.innerHTML += items.join(' ') + '<br />';

};

// setInterval(() => {
// 	out.innerHTML = '';
// }, 3000);

// You could even allow Javascript input...
function consoleInput( data ) {
    // Print it to console as typed
    console.log( data + '<br />' );
    try {
        console.log( eval( data ) );
    } catch (e) {
        console.log( e.stack );
    }
}
