<script>
    let direction = false
    let content = ''
</script>
<div class="terminal">
    <div class="terminal-header">
        <i class="bi bi-arrow-{ direction === false ? 'down' : 'up' }-circle-fill" on:click={ () => direction = ! direction }></i>
    </div>
    {#if direction}
        <div class="terminal-body">
            { content }
        </div>
    {/if}
</div>