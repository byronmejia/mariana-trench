import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';

const editorId      = 'html-editor';
const editorElement = document.createElement('div');
editorElement.setAttribute('id', editorId);

const target = document.getElementById('modal-change-lang') as HTMLElement;

const observer = new MutationObserver((mutations) => {
    const mutation = mutations[0];
    const target   = mutation.target;
    if (target.attributes.getNamedItem('aria-hidden') !== null) {
        const classicEditor         = document.getElementById('text_html_value') as HTMLTextAreaElement;
        const parentNode            = classicEditor.parentElement as HTMLElement;
        classicEditor.style.display = 'none';
        parentNode.appendChild(editorElement);
        const editor = ace.edit(editorId);
        editor.getSession().setMode('ace/mode/html');
        editor.setTheme('ace/theme/monokai')
    } else {
    }
});

const config = { attributes: true, childList: true, characterData: true };

observer.observe(target, config);
