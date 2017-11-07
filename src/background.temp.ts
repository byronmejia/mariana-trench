const target = document.getElementById('modal-change-lang') as HTMLElement;

class Pointer {
    private _location: number;
    private _element: HTMLElement;

    private _editor: HTMLElement;
    private _editorCode: HTMLElement;

    private _parent: HTMLElement | undefined;
    private _mirror: HTMLElement | undefined;

    private _preview: HTMLElement | undefined;

    constructor(location: number) {
        this._parent = undefined;
        this._mirror = undefined;

        this._location          = location;
        this._element           = document.createElement('span');
        this._element.innerText = '|';
        this._element.className = 'blinking-cursor';

        this._editor               = document.createElement('pre');
        this._editor.style.display = 'inline-block';
        this._editor.style.width   = '50%';

        this._editorCode = document.createElement('code');
        this._editor.appendChild(this._editorCode);

        this._preview               = document.createElement('div');
        this._preview.style.display = 'inline-block';
        this._preview.style.width   = '50%';
    }

    get location(): number {
        return this._location;
    }

    seekTo(val: number): void {
        this._location = val;
    }

    get element(): HTMLElement {
        return this._element;
    }

    private handleKeyDown(event: KeyboardEvent) {
        console.warn(event);
    }

    register(parent: HTMLElement, mirror: HTMLElement): void {
        this.seekTo(0);
        this._parent = parent;
        this._mirror = mirror;
        this._mirror.style.display = 'none';
        document.addEventListener('keydown', this.handleKeyDown);
    }

    unRegister(): void {
        this._parent = undefined;
        this._mirror = undefined;
        document.removeEventListener('keydown', this.handleKeyDown);
    }
}

const pointer = new Pointer(0);

function generateEditor(element: HTMLElement, mirror: HTMLTextAreaElement) {
    pointer.register(element, mirror);
}

const observer = new MutationObserver((mutations) => {
    const mutation = mutations[0];
    const target   = mutation.target;
    if (target.attributes.getNamedItem('aria-hidden') !== null) {
        const classicEditor         = document.getElementById('text_html_value') as HTMLTextAreaElement;
        const parentNode            = classicEditor.parentElement as HTMLElement;
        classicEditor.style.display = 'none';
        generateEditor(parentNode, classicEditor);
    } else {
        pointer.unRegister();
    }
});

const config = { attributes: true, childList: true, characterData: true };

observer.observe(target, config);
