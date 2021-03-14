<script>

    import { view } from './_store'

    import FilesExplorer from './FilesExplorer'
    import Inspect from './Inspect'
    import Accounts from './Accounts'

</script>

<div class="manager-panel">
    {#if $view === 'explorer' }
        <FilesExplorer />
    {:else if $view === 'inspect'}
        <Inspect />
    {:else if $view === 'accounts'}
        <Accounts />
    {/if}

</div>