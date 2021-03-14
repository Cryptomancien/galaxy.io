<script>
    let foo = 'var'
    let bool = false

    function getVar(key) {
        return key
    }

    function setVar(key, value) {
        return key = value
    }
</script>

<div>
    <div>
        foo: { foo }
    </div>

    <div>
        bool: { bool }
    </div>

    <div>
        foo:
        <input type="text">
    </div>

    <div>
        bool:
        <input type="text">
    </div>

    <div>
        <button type="button">Compile</button>
    </div>
</div>