<script>
    import crypto from 'crypto'

    let accounts = []

    for (let i = 0; i < 10; i++) {
        const account = crypto.randomBytes(12).toString('hex')
        accounts.push(account)
    }

</script>

<div>
    <ul>
        {#each accounts as account}
            <li>{ account }</li>
        {/each}
    </ul>
</div>