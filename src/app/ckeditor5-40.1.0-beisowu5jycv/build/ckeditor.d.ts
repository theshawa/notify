/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { BalloonEditor } from '@ckeditor/ckeditor5-editor-balloon';
import {
  Bold,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from '@ckeditor/ckeditor5-basic-styles';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { BlockToolbar } from '@ckeditor/ckeditor5-ui';
declare class Editor extends BalloonEditor {
  static builtinPlugins: (
    | typeof BlockToolbar
    | typeof Bold
    | typeof Essentials
    | typeof Italic
    | typeof Link
    | typeof List
    | typeof Paragraph
    | typeof Strikethrough
    | typeof Subscript
    | typeof Superscript
    | typeof Underline
  )[];
  static defaultConfig: EditorConfig;
}
export default Editor;
