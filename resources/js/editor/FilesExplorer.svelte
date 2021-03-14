<script>

    let explorer = [
        {
            name: 'main',
            files: [
                'hello-world.bas',
                'foo-bar.bas'
            ]
        }
    ]
</script>

<ul class="files-explorer">
    {#each explorer as item}
        <li class="folder">
            <i class="bi bi-folder2-open folder-icon"></i> {item.name}

            <ul class="files">
                {#each item.files as file}
                    <li class="file">
                        <i class="bi bi-file-earmark"></i>
                        { file }
                    </li>
                {/each}
            </ul>
        </li>
    {/each }
</ul>