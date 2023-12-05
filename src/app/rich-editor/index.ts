import { EditorConfig } from '@ckeditor/ckeditor5-core';
import Editor from '../ckeditor5-40.1.0-beisowu5jycv/build/ckeditor';

export const config: EditorConfig = {
  ui: {
    poweredBy: {
      forceVisible: false,
      position: 'border',
      horizontalOffset: 0,
      label: '',
      side: 'right',
      verticalOffset: 0,
    },
  },
  placeholder: 'Write here...',
  toolbar: [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'subscript',
    'superscript',
    '-',
    'numberedList',
    'bulletedList',
    '|',
    'undo',
    'redo',
  ],
};

export const RichEditor = Editor;
