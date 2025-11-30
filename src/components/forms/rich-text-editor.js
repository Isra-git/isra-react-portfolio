import React, { Component } from 'react';

// importaciones de la biblioteca DraftJS, para editor de texto
import { EditorState, convertToRaw } from 'draft-js';
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

  //usa FileReader para convertir una imagen a bas64(string)
  getBase64(file, callback) {}

  //callback toma el archivo como argumento
  uploadFile(file) {
    console.log('uploade file', file);
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
