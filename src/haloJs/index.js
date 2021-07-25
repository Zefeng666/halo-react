function createElement(type, props, ...children) {
    console.log(props, '===createElement');
    delete props.__source;

    return {
        type,
        props: {
            ...props,
            children: children.map((child) => {
                return typeof child === 'object' ? child : createTextElement(child)
            })
        }
    }
}

function createTextElement(text) {
    return {
        type: 'TEXT',
        props: {
            nodeValue: text,
            children: []
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