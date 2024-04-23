<script lang="ts">
    import ImageSubmission from "$lib/components/ImageSubmission.svelte";

    // This object contains the data from the server which just consists of the Loggly customer token
    export let data;
    
</script>

<!-- The ImageSubmission component is rendered and the Loggly customer token is passed to it -->
<ImageSubmission logglyToken={data.post.logglyToken}></ImageSubmission>
