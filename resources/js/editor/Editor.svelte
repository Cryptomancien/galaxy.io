<script>
    let content = ``
    let count = 1

    function refreshLines() {
        const parser = new DOMParser()
        let doc = parser.parseFromString(content, 'text/html')
        doc = doc.querySelector('body')

        const lines = doc.querySelectorAll('div').length + 1
        count = lines
    }
</script>

<div class="editor-wrapper">
    <div class="lines">
        {#each Array(count) as _, i }
           <div>
               {i + 1}
           </div>
        {/each}
    </div>
    <div contenteditable="true" class="editor" bind:innerHTML={content} on:keyup={ () => refreshLines() }>{content}</div>
</div>