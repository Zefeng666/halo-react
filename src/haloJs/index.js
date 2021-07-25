// 虚拟dom创建
function createElement(type, props, ...children) {
    console.log(type, props, ...children, '===createElement');
    
    delete props.__source;
    delete props.__self;

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
// 文本类型虚拟DOM创建
function createTextElement(text) {
    return {
        type: 'TEXT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}
// 通过虚拟dom新建dom元素
function createDom(vdom) {
    // 新建单个dom
    const dom = vdom.type === 'TEXT' 
        ? document.createTextNode('')
        : document.createElement(vdom.type)
    // 设置属性
    Object.keys(vdom.props)
        .filter(key => key !== 'children')
        .forEach(name => {
            // todo 事件处理 属性兼容
            dom[name] = vdom.props[name];
        })
    return dom;
}
// 将vdom转为真实dom
function render(vdom, container) {
    console.log(vdom, '=======vdom');
    nextUnitWork = {
        dom: container,
        props: {
            children: vdom
        }
    }
   
    
    
    // vdom.props.children.forEach((child) => {
    //     render(child, dom);
    // })
    // console.log(dom, '========dom');
    // container.appendChild(dom);
}

// 下一个单元任务
// render会初始化第一个任务
let nextUnitWork = null;

// 调度我们的diff或者渲染任务
function workLoop(deadline) {
    // 有下个任务并且当前帧还没有结束
    while(nextUnitWork && deadline.timeRemaining() > 1) {
        nextUnitWork = performUnitOfWork(nextUnitWork);
    }
    requestIdleCallback(workLoop);
}
// 启动空闲时间处理
requestIdleCallback(workLoop);
// 获取当前空闲任务
function performUnitOfWork(fiber) {
    // 获取下一个任务
    // 根据当前任务获取下一个任务
    if (!fiber.dom) {
        // 不是入口
        fiber.dom = createDom(fiber);
    }
    if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom)
    }
    const elements = fiber.props.children;
    // 构建fiber结构
    let index = 0;
    let prevSlibing = null;
    while(index < elements.length) {
        let element = elements[index];
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        }
        if (index === 0) {
            // 第一个元素，是父fiber的child属性
            fiber.child = newFiber;
        } else {
            // 其他是以兄弟元素存在，每个元素指向下个元素
            prevSlibing.slibing = newFiber;
        }
        prevSlibing = fiber;
        index++;
    }
    
    // 找下个任务
    // 先找子元素
    if (fiber.child) {
        return fiber.child;
    }
    // 没有子元素就找兄弟元素
    let nextFiber = fiber;
    while(nextFiber) {
        if (nextFiber.slibing) {
            return nextFiber.slibing;
        }
        // 没有兄弟元素了，找父元素
        nextFiber = nextFiber.parent;
    }
}

// fiber = {
//     dom: 真实dom,
//     parent: 父亲，
//     child: 第一个子元素，
//     slibing： 兄弟
// }

export default {
    createElement,
    render
}