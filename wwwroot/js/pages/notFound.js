/*
 * Todo:
 *      1. Change everything out to constants
 *      
 * 
 */
export default {
    name: 'not-found',
    data: function () {
        return {
            placeholder: {
                notFound: '404 Not Found',
                message: 'Oops! It seems that this page does not exist.',
            }
        }
    },
    template:
`
<div class="contact-us full-screen">
    <div class="container">
        <div class="row">
            <div class="text-center">
                <h2 class="title text-danger">
                    {{ placeholder.notFound }}
                </h2>
                <h2 class="title">
                    {{ placeholder.message }}
                </h2>
            </div> <!-- text-center -->
        </div> <!-- row -->
    </div> <!-- container -->
</div> <!-- contact-us full-screen -->
`
}