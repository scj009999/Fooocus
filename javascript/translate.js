// 直接执行的翻译插件代码
(function() {
    console.log('[Translate Plugin] 开始注入翻译功能...');

    // 创建样式
    const style = document.createElement('style');
    style.textContent = `
        .translate-button {
            font-size: 0.875rem;
            padding: 4px 8px;
            border-radius: 4px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            cursor: pointer;
            margin-left: 8px;
            line-height: 1;
            white-space: nowrap;
        }
        .translate-button:hover {
            background-color: #e0e0e0;
        }
        .translate-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);

    // 等待 Gradio 加载
    function waitForGradio() {
        const gradioContainer = document.querySelector('gradio-app');
        if (!gradioContainer) {
            console.log('[Translate Plugin] 等待 Gradio 容器加载...');
            setTimeout(waitForGradio, 1000);
            return;
        }

        // 等待 shadow root
        if (!gradioContainer.shadowRoot) {
            console.log('[Translate Plugin] 等待 Shadow DOM 加载...');
            setTimeout(waitForGradio, 1000);
            return;
        }

        const root = gradioContainer.shadowRoot;
        console.log('[Translate Plugin] Gradio 已加载，开始处理...');

        // 处理所有文本框
        function processTextareas() {
            const textareas = root.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                if (textarea.getAttribute('data-translate-button-added')) return;
                
                textarea.setAttribute('data-translate-button-added', 'true');
                
                const container = document.createElement('div');
                Object.assign(container.style, {
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%'
                });

                // 保存原始位置信息
                const parent = textarea.parentNode;
                const nextSibling = textarea.nextSibling;

                // 创建翻译按钮
                const button = document.createElement('button');
                button.textContent = '翻译';
                button.className = 'translate-button';
                
                // 添加翻译功能
                button.addEventListener('click', async () => {
                    if (!textarea.value.trim()) return;
                    
                    button.disabled = true;
                    button.textContent = '翻译中...';
                    
                    try {
                        const response = await fetch('https://translate.googleapis.com/translate_a/single?' + new URLSearchParams({
                            client: 'gtx',
                            sl: 'zh-CN',
                            tl: 'en',
                            dt: 't',
                            q: textarea.value
                        }));
                        
                        if (!response.ok) throw new Error(`翻译请求失败: ${response.status}`);
                        
                        const data = await response.json();
                        const translated = data?.[0]?.[0]?.[0];
                        
                        if (translated) {
                            textarea.value = translated;
                            textarea.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    } catch (error) {
                        console.error('[Translate Plugin] 翻译失败:', error);
                        // 显示错误提示
                        const toast = document.createElement('div');
                        toast.textContent = '翻译失败，请稍后重试';
                        Object.assign(toast.style, {
                            position: 'fixed',
                            bottom: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#ff4444',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            zIndex: '9999'
                        });
                        document.body.appendChild(toast);
                        setTimeout(() => toast.remove(), 3000);
                    } finally {
                        button.disabled = false;
                        button.textContent = '翻译';
                    }
                });

                // 重组 DOM
                container.appendChild(textarea);
                container.appendChild(button);
                
                if (nextSibling) {
                    parent.insertBefore(container, nextSibling);
                } else {
                    parent.appendChild(container);
                }
            });
        }

        // 监听 DOM 变化
        const observer = new MutationObserver((mutations) => {
            if (observer.timeout) {
                clearTimeout(observer.timeout);
            }
            observer.timeout = setTimeout(processTextareas, 100);
        });

        observer.observe(root, { childList: true, subtree: true });
        processTextareas();

        // 定期检查新添加的文本框
        setInterval(processTextareas, 2000);
    }

    // 开始执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForGradio);
    } else {
        waitForGradio();
    }
})();// 直接执行的翻译插件代码
(function() {
    console.log('[Translate Plugin] 开始注入翻译功能...');

    // 创建样式
    const style = document.createElement('style');
    style.textContent = `
        .translate-button {
            font-size: 0.875rem;
            padding: 4px 8px;
            border-radius: 4px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            cursor: pointer;
            margin-left: 8px;
            line-height: 1;
            white-space: nowrap;
        }
        .translate-button:hover {
            background-color: #e0e0e0;
        }
        .translate-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);

    // 等待 Gradio 加载
    function waitForGradio() {
        const gradioContainer = document.querySelector('gradio-app');
        if (!gradioContainer) {
            console.log('[Translate Plugin] 等待 Gradio 容器加载...');
            setTimeout(waitForGradio, 1000);
            return;
        }

        // 等待 shadow root
        if (!gradioContainer.shadowRoot) {
            console.log('[Translate Plugin] 等待 Shadow DOM 加载...');
            setTimeout(waitForGradio, 1000);
            return;
        }

        const root = gradioContainer.shadowRoot;
        console.log('[Translate Plugin] Gradio 已加载，开始处理...');

        // 处理所有文本框
        function processTextareas() {
            const textareas = root.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                if (textarea.getAttribute('data-translate-button-added')) return;
                
                textarea.setAttribute('data-translate-button-added', 'true');
                
                const container = document.createElement('div');
                Object.assign(container.style, {
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%'
                });

                // 保存原始位置信息
                const parent = textarea.parentNode;
                const nextSibling = textarea.nextSibling;

                // 创建翻译按钮
                const button = document.createElement('button');
                button.textContent = '翻译';
                button.className = 'translate-button';
                
                // 添加翻译功能
                button.addEventListener('click', async () => {
                    if (!textarea.value.trim()) return;
                    
                    button.disabled = true;
                    button.textContent = '翻译中...';
                    
                    try {
                        const response = await fetch('https://translate.googleapis.com/translate_a/single?' + new URLSearchParams({
                            client: 'gtx',
                            sl: 'zh-CN',
                            tl: 'en',
                            dt: 't',
                            q: textarea.value
                        }));
                        
                        if (!response.ok) throw new Error(`翻译请求失败: ${response.status}`);
                        
                        const data = await response.json();
                        const translated = data?.[0]?.[0]?.[0];
                        
                        if (translated) {
                            textarea.value = translated;
                            textarea.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    } catch (error) {
                        console.error('[Translate Plugin] 翻译失败:', error);
                        // 显示错误提示
                        const toast = document.createElement('div');
                        toast.textContent = '翻译失败，请稍后重试';
                        Object.assign(toast.style, {
                            position: 'fixed',
                            bottom: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#ff4444',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            zIndex: '9999'
                        });
                        document.body.appendChild(toast);
                        setTimeout(() => toast.remove(), 3000);
                    } finally {
                        button.disabled = false;
                        button.textContent = '翻译';
                    }
                });

                // 重组 DOM
                container.appendChild(textarea);
                container.appendChild(button);
                
                if (nextSibling) {
                    parent.insertBefore(container, nextSibling);
                } else {
                    parent.appendChild(container);
                }
            });
        }

        // 监听 DOM 变化
        const observer = new MutationObserver((mutations) => {
            if (observer.timeout) {
                clearTimeout(observer.timeout);
            }
            observer.timeout = setTimeout(processTextareas, 100);
        });

        observer.observe(root, { childList: true, subtree: true });
        processTextareas();

        // 定期检查新添加的文本框
        setInterval(processTextareas, 2000);
    }

    // 开始执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForGradio);
    } else {
        waitForGradio();
    }
})();
