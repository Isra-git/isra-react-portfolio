import React, { Component } from 'react';

// importaciones de la biblioteca DraftJS, para editor de texto
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { List } from 'immutable';

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentDidMount() {
    if (this.props.editMode && this.props.contentToEdit) {
      const blocksFromHtml = htmlToDraft(this.props.contentToEdit);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }
  // se pasa al editor como props para manejar, el segundo argumento es una func. que
  // espera que se actualice el estado antes de llamarse (setState->Asincrono)
  onEditorStateChange(editorState) {
    this.setState(
      { editorState },
      this.props.handleRichTextEditorChange(
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      )
    );
  }
  // onEditorStateChange(editorState) {
  //   this.setState({ editorState }, () => {
  //     const html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
  //     console.log(html); // aquí ves el HTML generado
  //     this.props.handleRichTextEditorChange(html);
  //   });
  // }

  //usa FileReader para convertir una imagen a bas64(string)
  getBase64(file, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    //gestiona la peticion asincrona de readAsDataURL
    reader.onload = () => callback(reader.result);
    //si hay un error devolvemos un objeto vacio
    reader.onerror = error => {};
  }

  // //callback toma el archivo como argumento
  uploadFile(file) {
    return new Promise((resolve, reject) => {
      this.getBase64(file, data => resolve({ data: { link: data } }));
    });
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadFile,
              alt: { present: true, mandatory: false },
              previewImage: true,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            },
            emoji: {
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              emojis: [
                '😀',
                '😁',
                '😂',
                '😃',
                '😉',
                '😋',
                '😎',
                '😍',
                '😗',
                '🤗',
                '🤔',
                '😣',
                '😫',
                '😴',
                '😌',
                '🤓',
                '😛',
                '😜',
                '😠',
                '😇',
                '😷',
                '😈',
                '👻',
                '😺',
                '😸',
                '😹',
                '😻',
                '😼',
                '😽',
                '🙀',
                '🙈',
                '🙉',
                '🙊',
                '👼',
                '👮',
                '🕵',
                '💂',
                '👳',
                '🎅',
                '👸',
                '👰',
                '👲',
                '🙍',
                '🙇',
                '🚶',
                '🏃',
                '💃',
                '⛷',
                '🏂',
                '🏌',
                '🏄',
                '🚣',
                '🏊',
                '⛹',
                '🏋',
                '🚴',
                '👫',
                '💪',
                '👈',
                '👉',
                '👉',
                '👆',
                '🖕',
                '👇',
                '🖖',
                '🤘',
                '🖐',
                '👌',
                '👍',
                '👎',
                '✊',
                '👊',
                '👏',
                '🙌',
                '🙏',
                '🐵',
                '🐶',
                '🐇',
                '🐥',
                '🐸',
                '🐌',
                '🐛',
                '🐜',
                '🐝',
                '🍉',
                '🍄',
                '🍔',
                '🍤',
                '🍨',
                '🍪',
                '🎂',
                '🍰',
                '🍾',
                '🍷',
                '🍸',
                '🍺',
                '🌍',
                '🚑',
                '⏰',
                '🌙',
                '🌝',
                '🌞',
                '⭐',
                '🌟',
                '🌠',
                '🌨',
                '🌩',
                '⛄',
                '🔥',
                '🎄',
                '🎈',
                '🎉',
                '🎊',
                '🎁',
                '🎗',
                '🏀',
                '🏈',
                '🎲',
                '🔇',
                '🔈',
                '📣',
                '🔔',
                '🎵',
                '🎷',
                '💰',
                '🖊',
                '📅',
                '✅',
                '❎',
                '💯',
              ],
            },
          }}
        />
      </div>
    );
  }
}
