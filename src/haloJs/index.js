function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children
        }
    }
}

function render(vdom, container) {
    console.log(vdom, '=======vdom');
    container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`
}

export default {
    createElement,
    render
}