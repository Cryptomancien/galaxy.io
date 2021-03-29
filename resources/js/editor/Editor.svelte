<script>
    import { onMount } from 'svelte'

    import {EditorState, basicSetup} from "@codemirror/basic-setup"
    import {EditorView, keymap} from "@codemirror/view"
    import {defaultTabBinding} from "@codemirror/commands"

    // theme

    // end theme


    onMount(async () => {

        const baseTheme = EditorView.baseTheme({
            "&light .cm-zebraStripe": {backgroundColor: "#f4fafa"},
            "&dark .cm-zebraStripe": {backgroundColor: "#1a2727"}
        })

const doc = `FUNCTION Initialize() Uint64
10 RETURN 0
END FUNCTION
`

        let editor = new EditorView({
            state: EditorState.create({
                doc,
                extensions: [
                    basicSetup,
                    keymap.of([defaultTabBinding]),

                ]
            }),
            parent: document.querySelector(".editor")
        })
    })


</script>

<div class="editor"></div>