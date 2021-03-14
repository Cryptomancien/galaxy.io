<script>
    import { view } from './_store'
</script>

<div class="side-panel">
    <i class="bi bi-files { $view === 'explorer' ? 'active' : '' }" on:click={ () => $view = 'explorer' }></i>
    <i class="bi bi-search { $view === 'inspect' ? 'active' : '' }" on:click={ () => $view = 'inspect' }></i>
    <i class="bi bi-people { $view === 'accounts' ? 'active' : '' }" on:click={ () => $view = 'accounts' }></i>
</div>