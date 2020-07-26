import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { Parchment } from 'parchment'

import axios from 'axios';
import styled from 'styled-components';

var FontAttributor = Quill.import('formats/font');
var fonts = ['arial', 'helvetica', 'time', 'courier', 'comic'];
FontAttributor.whitelist = fonts;
Quill.register(FontAttributor, true);

let Block = Quill.import("blots/block");
// Block.tagName = 'div';
// Quill.register(Block);
let Module = Quill.import("core/module");
let Inline = Quill.import("blots/inline");
const BlockEmbed = Quill.import('blots/block/embed');


const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;


const QuillClipboard = Quill.import('modules/clipboard');

class Td extends Block {
    // constructor(quill, options) {
    //     super(quill, options);

    // }

    static create(options) {
        let node = super.create();
        if (options.content) {
            node.appendChild(
                document.createTextNode(options.content.text)

            );
            console.log("COLSPAN", options.colspan);
        }
        if (options.colspan > 1) {
            node.setAttribute("colspan", options.colspan);
        }
        if (options.rowspan > 1) {
            node.setAttribute("rowspan", options.rowspan);
        }

        node.setAttribute('align', "center")

        return node;
    }

    static value(node) {
        var content = {
            content: { text: node.innerHTML }
        }, span;

        if (node.hasAttribute("colspan")) {
            span = node.getAttribute("colspan");
            if (span > 1) {
                content.colspan = span;
            }
        }
        if (node.hasAttribute("rowspan")) {
            span = node.getAttribute("rowspan");
            if (span > 1) {
                content.rowspan = span;
            }
        }

        return content;
    }
}
Td.blotName = "td";
Td.tagName = "td";
Td.allowedChildren = [Inline, Block];
Quill.register("blots/td", Td);



class Tr extends Block {
    // constructor(quill, options) {
    //     super(quill, options);
    //     console.log("TR created", quill, options);
    // }

    static create(options) {
        let node = super.create();
        if (options.length) {
            options.forEach((item, index) => {

                node.appendChild(Td.create(item));

            });
        } else {
            node.appendChild(Td.create({}));
        }

        return node;
    }

    static value(node) {
        var cells = [],
            children = node.childNodes;

        children.forEach((item, index) => {

            cells.push(Td.value(item));

        });
        return cells;
    }
}
Tr.blotName = "tr";
Tr.tagName = "tr";
Tr.allowedChildren = [
    Td
];
Tr.defaultChild = Td;
Quill.register("blots/tr", Tr);

class Tbody extends BlockEmbed {
    // constructor(quill, options) {
    //     super(quill, options);
    //     console.log(this.tagName + " created", quill, options);
    // }

    static create(options) {
        let node = super.create();
        if (options.length) {
            options.forEach((item, index) => {
                node.appendChild(Tr.create(item));
            });
        } else {
            node.appendChild(Tr.create([]));
        }

        return node;
    }

    static value(node) {
        var rows = [],
            children = node.childNodes;

        children.forEach((item, index) => {
            rows.push(Tr.value(item));
        });
        return rows;
    }
}
Tbody.blotName = "tbody";
Tbody.tagName = "tbody";
Tbody.allowedChildren = [
    Tr
];
Tbody.defaultChild = Tr;
Quill.register("blots/tbody", Tbody);

class Thead extends Tbody { }
Thead.blotName = "thead";
Thead.tagName = "thead";
Thead.allowedChildren = [
    Tr
];
Thead.defaultChild = Tr;
Quill.register("blots/thead", Thead);


class Table extends BlockEmbed {
    // constructor(quill, options) {
    //     super(quill, options);
    //     console.log("TABLE created", quill, options);
    // }

    static create(options) {
        let node = super.create();
        node.className = "table table-stripped table-hover table-border";

        // console.log("Creating TABLE >>", options, node);

        if (options.header) {
            node.appendChild(Thead.create(options.header));
        }
        if (options.body) {
            node.appendChild(Tbody.create(options.body));
        } else {
            node.appendChild(Tbody.create([]));
        }
        // if (options.footer) {
        //     node.appendChild(Tfoot.create(options.footer));
        // }



        return node;
    }


    static formats(node) {
        // We still need to report unregistered embed formats
        let format = {
            class: "table table-hover table-stripped table-border"
        };
        return format;
    }
    static value(node) {
        var header = [],
            body = [],
            footer = [],
            children = node.childNodes,
            classNames = node.className.split(" ");


        children.forEach((item, index) => {

            children.forEach((item, index) => {
                if (item.tagName.toUpperCase() === "THEAD") {
                    header = Thead.value(item);
                } else if (item.tagName.toUpperCase() === "TBODY") {
                    body = Tbody.value(item);
                }
            });

        });

        return {
            class: "table",
            stripped: classNames.indexOf("table-stripped") !== -1,
            hover: classNames.indexOf("table-hover") !== -1,
            border: classNames.indexOf("table-border") !== -1,
            header: header,
            body: body,
            footer: footer
        };
    }
}
Table.blotName = "table";
Table.tagName = "table";
Table.allowedChildren = [
    Tbody, Thead
];
Table.defaultChild = Tbody;
Quill.register("blots/table", Table);

class Tables extends Module { }

Quill.register('modules/tables', Tables);

// var icons = Quill.import('ui/icons');
// icons["table"] = '<i class="fa fa-home"></i>';

// console.log('quillimport:', Quill.imports);





class ImageBlot extends BlockEmbed {

    static create(value) {
        const imgTag = super.create();
        imgTag.setAttribute('src', value.src);
        imgTag.setAttribute('alt', value.alt);
        imgTag.setAttribute('class', "center");
        imgTag.setAttribute('width', '50%');
        console.log("creating IMAGE")
        return imgTag;
    }

    static value(node) {
        return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
    }

}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {

    static create(value) {
        if (value && value.src) {
            const videoTag = super.create();
            videoTag.setAttribute('src', value.src);
            videoTag.setAttribute('title', value.title);
            videoTag.setAttribute('width', '100%');
            videoTag.setAttribute('controls', '');

            return videoTag;
        } else {
            const iframeTag = document.createElement('iframe');
            iframeTag.setAttribute('src', value);
            iframeTag.setAttribute('frameborder', '0');
            iframeTag.setAttribute('allowfullscreen', true);
            iframeTag.setAttribute('width', '100%');
            return iframeTag;
        }
    }

    static value(node) {
        if (node.getAttribute('title')) {
            return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
        } else {
            return node.getAttribute('src');
        }
        // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
    }

}

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot);

class FileBlot extends BlockEmbed {

    static create(value) {
        const prefixTag = document.createElement('span');
        // prefixTag.innerText = "첨부파일 - ";

        const bTag = document.createElement('b');
        bTag.innerText = value;

        const linkTag = document.createElement('a');
        linkTag.setAttribute('href', value);
        linkTag.setAttribute("target", "_blank");
        linkTag.setAttribute("className", "file-link-inner-post");
        linkTag.appendChild(bTag);
        //linkTag 이런식으로 나온다 <a href="btn_editPic@3x.png" target="_blank" classname="file-link-inner-post"><b>btn_editPic@3x.png</b></a>

        const node = super.create();
        node.appendChild(prefixTag);
        node.appendChild(linkTag);

        return node;
    }

    static value(node) {
        const linkTag = node.querySelector('a');
        return linkTag.getAttribute('href');
    }

}

FileBlot.blotName = 'file';
FileBlot.tagName = 'p';
FileBlot.className = 'file-inner-post';
Quill.register(FileBlot);


class Variable extends Block {
    static create(value) {
        console.log('value: ', value)
        let node = super.create(value);
        node.textContent = value;
        return node;
    }
}
Variable.blotName = 'variable';
Variable.tagName = 'td';
// Variable.className = 'variable';

Quill.register(Variable);

const a = { content: { text: "" } }

class QuillEditor extends React.Component {

    bandId;
    placeholder;
    onEditorChange;
    onFilesChange;
    onPollsChange;
    _isMounted;

    constructor(props) {
        super(props);

        this.state = {
            files: [],
            row: 0,
            col: 0
        };

        this.reactQuillRef = null;

        this.inputOpenImageRef = React.createRef();
        this.inputOpenVideoRef = React.createRef();
        this.inputOpenFileRef = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // I V F P
    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    videoHandler = () => {
        this.inputOpenVideoRef.current.click();
    };

    fileHandler = () => {
        this.inputOpenFileRef.current.click();
    };


    fillArray = (value, row) => {
        var arr = [];
        for (var i = 0; i < row; i++) {
            arr.push(value);

        }
        return arr;
    }


    //custom table
    tableControlHandler(row, col) {
        const quill = this.reactQuillRef.getEditor();
        let range = quill.getSelection(true);


        quill.insertEmbed(range.index, 'table', {
            header: [
                this.fillArray(a, row)
                // ==
                // [a,a,a]
            ],

            body: this.fillArray(this.fillArray(a, row), col)
        });
        quill.setSelection(
            range.index + 1,
            Quill.sources.SILENT
        );
    }


    test = () => {
        console.log('test clicked')
        this.reactQuillRef.getEditor().insertEmbed(0, 'variable', 'variable name');
    };

    //INSERT IMAGE
    insertImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];

            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("file", file);

            axios.post('/api/blog/uploadfiles', formData, config)
                .then(response => {
                    if (response.data.success) {

                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;

                        quill.insertEmbed(position, "image", { src: "http://localhost:5000/" + response.data.url, alt: response.data.fileName });
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                files: [...this.state.files, file]
                            }, () => { this.props.onFilesChange(this.state.files) });
                        }
                    } else {
                        return alert('failed to upload file')
                    }
                })
        }
    };

    //INSERT VIDEO
    insertVideo = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];

            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("file", file);

            axios.post('/api/blog/uploadfiles', formData, config)
                .then(response => {
                    if (response.data.success) {

                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        quill.insertEmbed(position, "video", { src: "http://localhost:5000/" + response.data.url, title: response.data.fileName });
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                files: [...this.state.files, file]
                            }, () => { this.props.onFilesChange(this.state.files) });
                        }
                    } else {
                        return alert('failed to upload file')
                    }
                })
        }
    }

    //INSERT FILE
    insertFile = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            console.log(file);

            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("file", file);

            axios.post('/api/blog/uploadfiles', formData, config)
                .then(response => {
                    if (response.data.success) {

                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        quill.insertEmbed(position, "file", response.data.fileName);
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                files: [...this.state.files, file]
                            }, () => { this.props.onFilesChange(this.state.files) });
                        }
                    };
                })
        }
    };




    render() {
        const { value } = this.props;

        return (
            <div>
                <div id="toolbar">

                    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}></select>
                    {/* <select class="ql-font"></select> */}
                    <select class="ql-font">
                        <option value="arial" selected>Arial</option>
                        <option value="helvetica">Helvetica</option>
                        <option value="time" selected>Times</option>
                        <option value="courier">Courier</option>
                        <option value="comic">Comic Sans MS</option>
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className="ql-insertImage">
                        <i className="fa fa-image" />
                    </button>
                    <button className="ql-insertVideo">
                        <i className="fa fa-film" />
                    </button>
                    {/* <button className="ql-insertFile">
                        File
                    </button> */}
                    <button className="ql-link" />
                    <button className="ql-code-block" />
                    <button className="ql-video" />
                    <button className="ql-blockquote" />
                    <button className="ql-clean" />

                    <select className="ql-align">
                        <button class="ql-align" value="center"></button>
                        <button class="ql-align" value="justify"></button>
                        <button class="ql-align" value="right"></button>
                    </select>

                    <select class="ql-color"></select>
                    <select class="ql-background"></select>



                    <button class="ql-indent" value="-1" type="button"></button>
                    <button class="ql-indent" value="+1" type="button"></button>


                    <button class="ql-script" value="sub"></button>
                    <button class="ql-script" value="super"></button>


                    <button class="ql-list" value="ordered"></button>
                    <button class="ql-list" value="bullet"></button>


                    <button type="button" class=" fa fa-table" data-toggle="modal" data-target="#myModal">

                    </button>

                    <div class="modal" id="myModal">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <h4 class="modal-title">Set up table</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <div class="modal-body" style={{ textAlign: "center" }}>
                                    <input style={{ width: "100px" }} onChange={(e) => {

                                        this.setState({
                                            row: e.currentTarget.value
                                        })


                                    }}
                                        placeholder="input row" />

                                    <br /><br /><br />

                                    <input style={{ width: "100px" }} onChange={(e) => {

                                        this.setState({
                                            col: e.currentTarget.value - 1
                                        })


                                    }}
                                        placeholder="input col" />
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="fa fa-check-circle" style={{ width: "50px" }} data-dismiss="modal" onClick={() => {
                                        (this.state.col && this.state.row < 10) ? this.tableControlHandler(this.state.row, this.state.col) : alert("please input col and row less than 10")
                                    }
                                    }>OK</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <ReactQuill style={{ height: "500px", fontFamily: "Times New Roman" }}
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.props.onEditorChange}
                    modules={this.modules}
                    formats={this.formats}
                    value={value}
                />
                <input type="file" accept="image/*" ref={this.inputOpenImageRef} style={{ display: "none" }} onChange={this.insertImage} />
                <input type="file" accept="video/*" ref={this.inputOpenVideoRef} style={{ display: "none" }} onChange={this.insertVideo} />
                <input type="file" accept="*" ref={this.inputOpenFileRef} style={{ display: "none" }} onChange={this.insertFile} />

                {/* QUILL-TABLE */}



                {/* ============================== */}
            </div>
        )
    }



    modules = {
        syntax: true,
        tables: {
            headers: true,
            footers: false
        },
        toolbar: {
            container: "#toolbar",
            handlers: {
                insertImage: this.imageHandler,
                insertVideo: this.videoHandler,
                insertFile: this.fileHandler,
                // tableControlHandler: this.tableControlHandler
                // insertPoll: this.pollHandler,

            }
        },

    };



    formats = [
        'header',
        'font',
        'bold', 'italic', 'underline', 'strike',
        'image', 'video', 'file', 'link', "code-block", "video", "blockquote", "clean",
        "align",
        'background',
        'color',
        'format',
        'list',
        'script',
        'indent',
        'table'
    ];
}

export default QuillEditor;
const Wrapper = styled.div`

`