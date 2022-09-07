import React from "react";

const Pikachu = (props) => {
    //Sky : e1
    //Ground : e2
    //Body : e3
    //Ears : e4
    //Cheeks : e5
    const {svg_e1, svg_e2, svg_e3, svg_e4,svg_e5} = props;
    return (
        <>
            <svg width="738" height="462" viewBox="0 0 738 462" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                    <path d="M738 0H0V303H738V0Z" fill={svg_e1} id="svg-e1"/>
                    <path d="M0 302.5H-0.5V303V462V462.5H0H738H738.5V462V303V302.5H738H0Z" fill={svg_e2} stroke="black"
                          id="svg-e1"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M312.981 152.629C322.411 142.734 331.243 131.085 338.9 118C352.4 95.1 360.2 71.2 362.5 49.9C362.8 47.1 359.6 45.3 357.4 46.9C339.9 59.3 322.9 77.8 309.5 100.7C296 123.6 288.2 147.5 285.9 168.8C285.855 169.221 285.887 169.621 285.981 169.992C277.002 180.206 271.6 193.787 271.6 209.7C271.6 211.4 271.7 213.1 271.8 214.8C269.8 219.2 268.7 224 268.7 228.9C268.7 237.2 271.8 244.9 277.2 251.6C287.1 263.9 304.9 272.7 325.7 274.5C328.3 274.9 331 275 333.7 275C336.4 275 339.1 274.8 341.7 274.5C362.6 272.7 380.4 263.9 390.3 251.5C395.7 244.8 398.7 237.1 398.7 228.9C398.7 224 397.6 219.3 395.6 214.8C395.7 213.1 395.8 211.4 395.8 209.7C395.8 196.221 391.924 184.415 385.281 174.911C401.78 176.419 419.908 175.496 438.6 171.7C464.7 166.4 487.6 156.3 505.1 143.7C507.4 142.1 506.6 138.5 503.9 137.9C482.9 133.2 457.9 132.9 431.8 138.2C408.975 142.835 388.598 151.141 372.206 161.579C361.622 153.834 348.246 149.5 333.7 149.5C326.435 149.5 319.461 150.581 312.981 152.629ZM520.117 185.369L520.096 185.373L520.089 185.374C486.651 191.712 453.199 198.053 419.7 204.3C416.4 204.9 416.2 206 417.1 209C420.699 220.248 424.249 231.521 427.798 242.794L427.8 242.8L427.802 242.806C431.351 254.079 434.901 265.352 438.5 276.6C439.6 280.1 438.8 281.3 435.4 282.1C431.109 283.033 426.841 284.074 422.584 285.113L422.583 285.113C417.712 286.301 412.856 287.486 408 288.5C405 289.1 405 290.2 405.8 292.7C408.9 302.4 411.8 312.1 414.7 321.8C417.1 329.9 417.1 329.9 409.1 332.4C408.783 332.506 408.355 332.583 407.919 332.663C407.528 332.733 407.131 332.806 406.8 332.9C406.91 333.636 407.002 334.265 407.084 334.818C407.522 337.797 407.641 338.605 408.4 342.4C408.8 342.6 409.3 342.7 410 342.8C411.283 342.95 412.567 343.097 413.85 343.244C420.267 343.981 426.683 344.717 433.1 345.8C436.3 346.3 437 345.8 436.2 342.7C435.1 338.4 434.05 334.05 433 329.7L432.999 329.697C431.95 325.348 430.9 320.999 429.8 316.7L429.762 316.548C428.639 312.007 428.086 309.772 428.946 308.842C429.78 307.94 431.943 308.267 436.204 308.91C436.398 308.939 436.597 308.969 436.8 309C449.461 310.879 462.122 312.624 475.001 314.399C477.889 314.797 480.788 315.197 483.7 315.6C483.491 314.889 483.317 314.249 483.156 313.656C482.932 312.831 482.733 312.098 482.5 311.4C476.8 293 471.1 274.6 465.5 256.2C464.1 251.5 464.4 251.2 469.5 251.8C477.376 252.616 485.253 253.399 493.136 254.183C504.569 255.319 516.017 256.457 527.5 257.7C530.2 258 531.4 257.2 532.5 254.8C538.646 241.447 544.849 228.15 551.066 214.825L551.069 214.818C553.045 210.583 555.023 206.344 557 202.1C559.313 197.178 561.59 192.257 563.916 187.231C565.512 183.781 567.131 180.282 568.8 176.7C567.3 176.5 566.6 176.5 565.9 176.7C550.64 179.583 535.38 182.475 520.117 185.369ZM402.5 331.95C402.575 332.2 402.65 332.45 402.7 332.7L404.6 342.4C404.7 343.8 404.8 345.2 404.8 346.6C404.8 369.1 391 387.3 374.1 387.3C372.4 387.3 370.8 387.1 369.2 386.8C367.6 386.4 366.1 385.9 364.6 385.3C363.1 384.6 361.6 383.8 360.2 382.8C349.9 377.8 339.2 377 334.9 376.9H334.5H333.4H332.8C322 376.9 314 379.6 309.1 381.9C307.3 383.2 305.4 384.3 303.4 385.2C300.4 386.5 297.2 387.2 293.9 387.2C276.9 387.2 263.2 369 263.2 346.5C263.2 336.4 265.4 331.3 265.4 331.3C265.4 331.3 267.1 326.5 268.2 324.3C271.4 315.8 276 301.3 275.5 290.6C275.2 288.5 275 286.5 275 284.6C273.7 277.6 274.4 261.3 274.4 261.3C274.4 257.8 275.5 254.7 277.4 252C287.3 264.3 305.1 273.1 325.9 274.9C328.5 275.2 331.2 275.4 333.9 275.4C336.6 275.4 339.3 275.3 341.9 274.9C362.8 273.1 380.6 264.3 390.5 251.9C392.4 254.6 393.5 257.8 393.5 261.2C393.5 261.2 394.2 277.5 392.9 284.5C392.9 286.4 392.5 290.4 392.5 290.4C392.5 301.1 398.6 320.3 401.2 327.9C401.6 328.9 402.3 331.2 402.3 331.2C402.35 331.45 402.425 331.7 402.5 331.95ZM303.7 392.1C303.7 394.364 298.865 396.2 292.9 396.2C286.935 396.2 282.1 394.364 282.1 392.1C282.1 389.836 286.935 388 292.9 388C298.865 388 303.7 389.836 303.7 392.1ZM376.5 396.2C382.465 396.2 387.3 394.364 387.3 392.1C387.3 389.836 382.465 388 376.5 388C370.535 388 365.7 389.836 365.7 392.1C365.7 394.364 370.535 396.2 376.5 396.2Z"
                          fill={svg_e3} id="svg-e3"/>
                    <path
                        d="M338.9 118L338.039 117.492L338.037 117.495L338.9 118ZM312.981 152.629L312.258 151.939L309.575 154.754L313.283 153.582L312.981 152.629ZM362.5 49.9L363.494 50.0073L363.494 50.0065L362.5 49.9ZM357.4 46.9L357.978 47.716L357.988 47.7087L357.4 46.9ZM309.5 100.7L310.362 101.208L310.363 101.205L309.5 100.7ZM285.9 168.8L284.906 168.693L284.906 168.693L285.9 168.8ZM285.981 169.992L286.732 170.653L287.08 170.257L286.95 169.746L285.981 169.992ZM271.8 214.8L272.71 215.214L272.813 214.988L272.798 214.741L271.8 214.8ZM277.2 251.6L277.979 250.973L277.979 250.972L277.2 251.6ZM325.7 274.5L325.852 273.512L325.819 273.507L325.786 273.504L325.7 274.5ZM341.7 274.5L341.614 273.504L341.6 273.505L341.585 273.507L341.7 274.5ZM390.3 251.5L389.521 250.872L389.518 250.876L390.3 251.5ZM395.6 214.8L394.602 214.741L394.587 214.984L394.686 215.206L395.6 214.8ZM385.281 174.911L385.372 173.915L383.228 173.719L384.462 175.484L385.281 174.911ZM438.6 171.7L438.401 170.72L438.6 171.7ZM505.1 143.7L504.529 142.879L504.522 142.884L504.516 142.889L505.1 143.7ZM503.9 137.9L503.682 138.876L503.683 138.876L503.9 137.9ZM431.8 138.2L431.999 139.18L431.999 139.18L431.8 138.2ZM372.206 161.579L371.615 162.386L372.166 162.79L372.743 162.423L372.206 161.579ZM520.096 185.373L520.28 186.356L520.282 186.355L520.096 185.373ZM520.117 185.369L520.303 186.351L520.303 186.351L520.117 185.369ZM520.089 185.374L519.905 184.391L519.903 184.391L520.089 185.374ZM419.7 204.3L419.879 205.284L419.883 205.283L419.7 204.3ZM417.1 209L416.142 209.287L416.145 209.296L416.148 209.305L417.1 209ZM427.798 242.794L426.844 243.094L426.844 243.095L427.798 242.794ZM427.802 242.806L428.756 242.506L428.756 242.505L427.802 242.806ZM438.5 276.6L439.454 276.3L439.452 276.295L438.5 276.6ZM435.4 282.1L435.612 283.077L435.621 283.075L435.629 283.073L435.4 282.1ZM422.584 285.113L422.808 286.087L422.821 286.084L422.584 285.113ZM422.583 285.113L422.358 284.139L422.346 284.142L422.583 285.113ZM408 288.5L408.196 289.481L408.204 289.479L408 288.5ZM405.8 292.7L406.753 292.396L406.752 292.395L405.8 292.7ZM414.7 321.8L415.659 321.516L415.658 321.514L414.7 321.8ZM409.1 332.4L408.802 331.446L408.793 331.448L408.784 331.451L409.1 332.4ZM407.919 332.663L408.097 333.646L408.097 333.646L407.919 332.663ZM406.8 332.9L406.525 331.938L405.682 332.179L405.811 333.047L406.8 332.9ZM407.084 334.818L406.094 334.964L406.094 334.964L407.084 334.818ZM408.4 342.4L407.419 342.596L407.515 343.076L407.953 343.294L408.4 342.4ZM410 342.8L409.859 343.79L409.871 343.792L409.884 343.793L410 342.8ZM413.85 343.244L413.964 342.251L413.964 342.251L413.85 343.244ZM433.1 345.8L432.934 346.786L432.946 346.788L433.1 345.8ZM436.2 342.7L435.231 342.948L435.232 342.95L436.2 342.7ZM433 329.7L433.972 329.466L433.972 329.464L433 329.7ZM432.999 329.697L432.027 329.932L432.028 329.933L432.999 329.697ZM429.8 316.7L428.829 316.94L428.831 316.948L429.8 316.7ZM429.762 316.548L428.792 316.788L428.792 316.788L429.762 316.548ZM428.946 308.842L429.68 309.521L429.68 309.521L428.946 308.842ZM436.204 308.91L436.353 307.921L436.353 307.921L436.204 308.91ZM436.8 309L436.651 309.989L436.653 309.989L436.8 309ZM475.001 314.399L474.865 315.39L474.865 315.39L475.001 314.399ZM483.7 315.6L483.563 316.591L485.096 316.803L484.659 315.318L483.7 315.6ZM483.156 313.656L484.121 313.394L484.121 313.394L483.156 313.656ZM482.5 311.4L481.545 311.696L481.548 311.706L481.551 311.716L482.5 311.4ZM465.5 256.2L464.542 256.486L464.543 256.491L465.5 256.2ZM469.5 251.8L469.383 252.793L469.397 252.795L469.5 251.8ZM493.136 254.183L493.037 255.178L493.037 255.178L493.136 254.183ZM527.5 257.7L527.61 256.706L527.608 256.706L527.5 257.7ZM532.5 254.8L531.592 254.382L531.591 254.383L532.5 254.8ZM551.066 214.825L550.162 214.398L550.16 214.402L551.066 214.825ZM551.069 214.818L551.974 215.245L551.975 215.241L551.069 214.818ZM557 202.1L556.095 201.675L556.094 201.678L557 202.1ZM563.916 187.231L564.823 187.651L564.823 187.651L563.916 187.231ZM568.8 176.7L569.706 177.122L570.281 175.889L568.932 175.709L568.8 176.7ZM565.9 176.7L566.086 177.683L566.131 177.674L566.175 177.662L565.9 176.7ZM402.7 332.7L403.681 332.508L403.681 332.504L402.7 332.7ZM404.6 342.4L405.597 342.329L405.593 342.268L405.581 342.208L404.6 342.4ZM369.2 386.8L368.957 387.77L368.986 387.777L369.016 387.783L369.2 386.8ZM364.6 385.3L364.177 386.206L364.202 386.218L364.229 386.228L364.6 385.3ZM360.2 382.8L360.781 381.986L360.713 381.937L360.637 381.9L360.2 382.8ZM334.9 376.9L334.923 375.9L334.912 375.9H334.9V376.9ZM309.1 381.9L308.675 380.995L308.59 381.034L308.514 381.089L309.1 381.9ZM303.4 385.2L303.798 386.118L303.81 386.112L303.4 385.2ZM265.4 331.3L266.318 331.696L266.331 331.665L266.343 331.634L265.4 331.3ZM268.2 324.3L269.094 324.747L269.118 324.701L269.136 324.652L268.2 324.3ZM275.5 290.6L276.499 290.553L276.497 290.506L276.49 290.458L275.5 290.6ZM275 284.6H276V284.508L275.983 284.417L275 284.6ZM274.4 261.3L275.399 261.343L275.4 261.321V261.3H274.4ZM277.4 252L278.179 251.373L277.346 250.338L276.582 251.424L277.4 252ZM325.9 274.9L326.015 273.906L326 273.905L325.986 273.904L325.9 274.9ZM341.9 274.9L341.814 273.904L341.781 273.906L341.748 273.912L341.9 274.9ZM390.5 251.9L391.318 251.324L390.55 250.234L389.718 251.276L390.5 251.9ZM393.5 261.2H392.5V261.221L392.501 261.243L393.5 261.2ZM392.9 284.5L391.917 284.317L391.9 284.408V284.5H392.9ZM392.5 290.4L391.505 290.3L391.5 290.35V290.4H392.5ZM401.2 327.9L400.254 328.224L400.262 328.248L400.271 328.271L401.2 327.9ZM402.3 331.2L403.281 331.004L403.271 330.956L403.257 330.909L402.3 331.2ZM338.037 117.495C330.418 130.515 321.632 142.101 312.258 151.939L313.705 153.319C323.189 143.367 332.068 131.656 339.763 118.505L338.037 117.495ZM361.506 49.7926C359.222 70.9395 351.473 94.7041 338.039 117.492L339.762 118.508C353.328 95.4958 361.178 71.4604 363.494 50.0073L361.506 49.7926ZM357.988 47.7087C359.487 46.6186 361.713 47.8557 361.506 49.7935L363.494 50.0065C363.887 46.3442 359.713 43.9814 356.812 46.0913L357.988 47.7087ZM310.363 101.205C323.699 78.4152 340.606 60.0257 357.978 47.7159L356.822 46.0841C339.195 58.5742 322.102 77.1847 308.637 100.195L310.363 101.205ZM286.894 168.907C289.178 147.76 296.928 123.996 310.362 101.208L308.639 100.192C295.073 123.204 287.222 147.24 284.906 168.693L286.894 168.907ZM286.95 169.746C286.885 169.491 286.862 169.21 286.894 168.907L284.906 168.693C284.848 169.232 284.888 169.752 285.012 170.238L286.95 169.746ZM272.6 209.7C272.6 194.023 277.918 180.678 286.732 170.653L285.23 169.332C276.085 179.733 270.6 193.551 270.6 209.7H272.6ZM272.798 214.741C272.698 213.036 272.6 211.366 272.6 209.7H270.6C270.6 211.434 270.702 213.164 270.802 214.859L272.798 214.741ZM269.7 228.9C269.7 224.15 270.766 219.491 272.71 215.214L270.89 214.386C268.834 218.909 267.7 223.85 267.7 228.9H269.7ZM277.979 250.972C272.699 244.421 269.7 236.937 269.7 228.9H267.7C267.7 237.463 270.901 245.379 276.421 252.228L277.979 250.972ZM325.786 273.504C305.191 271.721 287.67 263.014 277.979 250.973L276.421 252.227C286.53 264.786 304.608 273.679 325.614 275.496L325.786 273.504ZM333.7 274C331.02 274 328.378 273.9 325.852 273.512L325.548 275.488C328.221 275.9 330.98 276 333.7 276V274ZM341.585 273.507C339.012 273.803 336.352 274 333.7 274V276C336.448 276 339.188 275.797 341.815 275.493L341.585 273.507ZM389.518 250.876C379.828 263.014 362.309 271.721 341.614 273.504L341.786 275.496C362.891 273.679 380.972 264.786 391.081 252.124L389.518 250.876ZM397.7 228.9C397.7 236.843 394.797 244.327 389.521 250.872L391.079 252.128C396.603 245.273 399.7 237.357 399.7 228.9H397.7ZM394.686 215.206C396.635 219.592 397.7 224.154 397.7 228.9H399.7C399.7 223.846 398.565 219.008 396.514 214.394L394.686 215.206ZM394.8 209.7C394.8 211.366 394.702 213.036 394.602 214.741L396.598 214.859C396.698 213.164 396.8 211.434 396.8 209.7H394.8ZM384.462 175.484C390.983 184.813 394.8 196.418 394.8 209.7H396.8C396.8 196.023 392.865 184.016 386.101 174.338L384.462 175.484ZM438.401 170.72C419.8 174.497 401.77 175.414 385.372 173.915L385.19 175.907C401.79 177.424 420.016 176.494 438.799 172.68L438.401 170.72ZM504.516 142.889C487.141 155.398 464.375 165.446 438.401 170.72L438.799 172.68C465.025 167.354 488.059 157.202 505.684 144.512L504.516 142.889ZM503.683 138.876C505.582 139.298 506.073 141.805 504.529 142.879L505.671 144.521C508.727 142.395 507.618 137.702 504.117 136.924L503.683 138.876ZM431.999 139.18C457.975 133.905 482.832 134.21 503.682 138.876L504.118 136.924C482.968 132.191 457.825 131.895 431.601 137.22L431.999 139.18ZM372.743 162.423C389.024 152.055 409.285 143.792 431.999 139.18L431.601 137.22C408.665 141.878 388.171 150.227 371.668 160.736L372.743 162.423ZM333.7 150.5C348.047 150.5 361.214 154.774 371.615 162.386L372.796 160.772C362.031 152.894 348.444 148.5 333.7 148.5V150.5ZM313.283 153.582C319.662 151.566 326.534 150.5 333.7 150.5V148.5C326.335 148.5 319.26 149.596 312.68 151.675L313.283 153.582ZM520.282 186.355L520.303 186.351L519.931 184.386L519.911 184.39L520.282 186.355ZM520.272 186.357L520.28 186.356L519.913 184.39L519.905 184.391L520.272 186.357ZM419.883 205.283C453.384 199.036 486.838 192.695 520.275 186.356L519.903 184.391C486.465 190.73 453.014 197.071 419.517 203.317L419.883 205.283ZM418.058 208.713C417.837 207.976 417.703 207.418 417.657 206.98C417.611 206.545 417.662 206.316 417.726 206.185C417.838 205.952 418.22 205.586 419.879 205.284L419.521 203.316C417.88 203.615 416.512 204.098 415.924 205.315C415.638 205.909 415.601 206.555 415.668 207.189C415.734 207.82 415.913 208.524 416.142 209.287L418.058 208.713ZM428.752 242.494C425.203 231.221 421.653 219.946 418.052 208.695L416.148 209.305C419.746 220.55 423.295 231.821 426.844 243.094L428.752 242.494ZM428.754 242.499L428.752 242.493L426.844 243.095L426.846 243.101L428.754 242.499ZM428.756 242.505L428.754 242.499L426.846 243.101L426.848 243.107L428.756 242.505ZM439.452 276.295C435.854 265.05 432.305 253.779 428.756 242.506L426.848 243.106C430.397 254.379 433.947 265.654 437.548 276.905L439.452 276.295ZM435.629 283.073C437.336 282.672 438.783 282.1 439.502 280.866C440.224 279.625 440.009 278.067 439.454 276.3L437.546 276.9C438.091 278.633 438.026 279.425 437.773 279.859C437.517 280.3 436.864 280.728 435.171 281.127L435.629 283.073ZM422.821 286.084C427.08 285.045 431.336 284.007 435.612 283.077L435.188 281.123C430.883 282.059 426.602 283.103 422.347 284.141L422.821 286.084ZM422.808 286.087L422.808 286.087L422.359 284.139L422.358 284.139L422.808 286.087ZM408.204 289.479C413.079 288.461 417.952 287.272 422.82 286.085L422.346 284.142C417.472 285.331 412.632 286.511 407.796 287.521L408.204 289.479ZM406.752 292.395C406.555 291.778 406.428 291.308 406.375 290.933C406.322 290.56 406.357 290.371 406.399 290.271C406.459 290.126 406.709 289.778 408.196 289.481L407.804 287.519C406.291 287.822 405.041 288.325 404.551 289.504C404.318 290.066 404.316 290.659 404.394 291.214C404.472 291.767 404.645 292.372 404.848 293.005L406.752 292.395ZM415.658 321.514C412.759 311.815 409.856 302.106 406.753 292.396L404.847 293.004C407.944 302.694 410.841 312.385 413.742 322.086L415.658 321.514ZM409.398 333.355C411.375 332.737 412.939 332.25 414.09 331.744C415.236 331.24 416.172 330.636 416.684 329.667C417.195 328.7 417.17 327.583 416.947 326.344C416.722 325.099 416.252 323.518 415.659 321.516L413.741 322.084C414.348 324.132 414.778 325.588 414.978 326.699C415.18 327.817 415.105 328.375 414.916 328.733C414.728 329.089 414.314 329.46 413.285 329.913C412.261 330.363 410.825 330.813 408.802 331.446L409.398 333.355ZM408.097 333.646C408.508 333.572 409.017 333.482 409.416 333.349L408.784 331.451C408.55 331.529 408.202 331.595 407.74 331.679L408.097 333.646ZM407.075 333.862C407.348 333.783 407.693 333.72 408.097 333.646L407.74 331.679C407.363 331.747 406.913 331.828 406.525 331.938L407.075 333.862ZM408.073 334.672C407.991 334.119 407.899 333.49 407.789 332.753L405.811 333.047C405.92 333.783 406.013 334.41 406.094 334.964L408.073 334.672ZM409.381 342.204C408.626 338.428 408.509 337.638 408.073 334.672L406.094 334.964C406.535 337.956 406.656 338.781 407.419 342.596L409.381 342.204ZM410.141 341.81C409.436 341.709 409.085 341.625 408.847 341.506L407.953 343.294C408.515 343.575 409.164 343.691 409.859 343.79L410.141 341.81ZM413.964 342.251C412.68 342.104 411.398 341.957 410.116 341.807L409.884 343.793C411.168 343.943 412.453 344.091 413.736 344.238L413.964 342.251ZM433.266 344.814C426.819 343.726 420.376 342.987 413.964 342.251L413.736 344.238C420.157 344.975 426.547 345.708 432.934 346.786L433.266 344.814ZM435.232 342.95C435.426 343.703 435.505 344.214 435.503 344.556C435.501 344.891 435.423 344.911 435.462 344.874C435.48 344.857 435.406 344.943 434.997 344.964C434.6 344.984 434.039 344.935 433.254 344.812L432.946 346.788C433.761 346.915 434.487 346.992 435.097 346.961C435.694 346.932 436.345 346.793 436.838 346.326C437.352 345.839 437.499 345.185 437.503 344.569C437.507 343.961 437.374 343.247 437.168 342.45L435.232 342.95ZM432.028 329.935C433.078 334.284 434.129 338.64 435.231 342.948L437.169 342.452C436.071 338.16 435.022 333.817 433.972 329.466L432.028 329.935ZM432.028 329.933L432.028 329.936L433.972 329.464L433.971 329.461L432.028 329.933ZM428.831 316.948C429.929 321.239 430.977 325.582 432.027 329.932L433.971 329.462C432.922 325.115 431.871 320.759 430.769 316.452L428.831 316.948ZM428.792 316.788L428.829 316.94L430.771 316.46L430.733 316.308L428.792 316.788ZM428.212 308.163C427.813 308.594 427.629 309.128 427.561 309.676C427.493 310.212 427.529 310.82 427.62 311.477C427.8 312.785 428.236 314.542 428.792 316.788L430.733 316.308C430.166 314.013 429.763 312.382 429.601 311.204C429.521 310.619 429.509 310.21 429.545 309.924C429.58 309.649 429.649 309.555 429.68 309.521L428.212 308.163ZM436.353 307.921C434.247 307.603 432.576 307.35 431.331 307.297C430.159 307.248 428.967 307.346 428.212 308.163L429.68 309.521C429.759 309.436 430.065 309.246 431.248 309.296C432.358 309.342 433.899 309.573 436.054 309.899L436.353 307.921ZM436.949 308.011C436.746 307.981 436.547 307.951 436.353 307.921L436.054 309.899C436.249 309.928 436.448 309.958 436.651 309.989L436.949 308.011ZM475.138 313.409C462.258 311.633 449.602 309.889 436.947 308.011L436.653 309.989C449.32 311.869 461.986 313.615 474.865 315.39L475.138 313.409ZM483.837 314.609C480.925 314.206 478.026 313.807 475.138 313.409L474.865 315.39C477.753 315.788 480.651 316.188 483.563 316.591L483.837 314.609ZM482.191 313.918C482.352 314.51 482.528 315.16 482.741 315.882L484.659 315.318C484.454 314.619 484.282 313.987 484.121 313.394L482.191 313.918ZM481.551 311.716C481.774 312.383 481.965 313.087 482.191 313.918L484.121 313.394C483.898 312.574 483.692 311.814 483.449 311.084L481.551 311.716ZM464.543 256.491C470.144 274.894 475.845 293.296 481.545 311.696L483.455 311.104C477.755 292.704 472.056 274.306 466.457 255.909L464.543 256.491ZM469.617 250.807C468.352 250.658 467.308 250.555 466.503 250.574C465.746 250.592 464.893 250.717 464.325 251.338C463.737 251.979 463.73 252.842 463.826 253.575C463.927 254.346 464.195 255.321 464.542 256.486L466.458 255.915C466.105 254.729 465.886 253.904 465.809 253.315C465.727 252.69 465.85 252.633 465.8 252.688C465.77 252.721 465.86 252.59 466.55 252.573C467.192 252.558 468.098 252.642 469.383 252.793L469.617 250.807ZM493.235 253.188C485.351 252.404 477.477 251.621 469.603 250.805L469.397 252.795C477.276 253.611 485.154 254.394 493.037 255.178L493.235 253.188ZM527.608 256.706C516.12 255.462 504.668 254.324 493.235 253.188L493.037 255.178C504.471 256.314 515.915 257.452 527.392 258.694L527.608 256.706ZM531.591 254.383C531.071 255.517 530.603 256.096 530.088 256.404C529.582 256.706 528.863 256.845 527.61 256.706L527.39 258.694C528.837 258.855 530.068 258.744 531.112 258.121C532.147 257.504 532.829 256.483 533.409 255.217L531.591 254.383ZM550.16 214.402C543.943 227.727 537.739 241.026 531.592 254.382L533.408 255.218C539.553 241.867 545.755 228.574 551.972 215.248L550.16 214.402ZM550.165 214.392L550.162 214.398L551.971 215.251L551.974 215.245L550.165 214.392ZM556.094 201.678C554.116 205.922 552.139 210.16 550.163 214.396L551.975 215.241C553.951 211.006 555.929 206.767 557.906 202.522L556.094 201.678ZM563.008 186.811C560.682 191.837 558.406 196.756 556.095 201.675L557.905 202.525C560.219 197.601 562.498 192.676 564.823 187.651L563.008 186.811ZM567.894 176.278C566.224 179.861 564.604 183.361 563.008 186.811L564.823 187.651C566.42 184.201 568.038 180.703 569.706 177.122L567.894 176.278ZM566.175 177.662C566.664 177.522 567.189 177.494 568.668 177.691L568.932 175.709C567.411 175.506 566.536 175.478 565.625 175.739L566.175 177.662ZM520.303 186.351C535.566 183.458 550.826 180.565 566.086 177.683L565.714 175.717C550.454 178.6 535.194 181.493 519.931 184.386L520.303 186.351ZM403.681 332.504C403.62 332.2 403.53 331.904 403.458 331.663L401.542 332.237C401.62 332.496 401.68 332.7 401.719 332.896L403.681 332.504ZM405.581 342.208L403.681 332.508L401.719 332.892L403.619 342.592L405.581 342.208ZM405.8 346.6C405.8 345.158 405.697 343.723 405.597 342.329L403.602 342.471C403.703 343.877 403.8 345.242 403.8 346.6H405.8ZM374.1 388.3C382.933 388.3 390.88 383.542 396.585 375.99C402.291 368.439 405.8 358.047 405.8 346.6H403.8C403.8 357.652 400.409 367.611 394.99 374.785C389.57 381.958 382.167 386.3 374.1 386.3V388.3ZM369.016 387.783C370.656 388.09 372.32 388.3 374.1 388.3V386.3C372.48 386.3 370.944 386.11 369.384 385.817L369.016 387.783ZM364.229 386.228C365.765 386.843 367.308 387.358 368.957 387.77L369.442 385.83C367.891 385.442 366.435 384.957 364.971 384.371L364.229 386.228ZM359.619 383.614C361.087 384.662 362.646 385.492 364.177 386.206L365.023 384.394C363.554 383.708 362.113 382.938 360.781 381.986L359.619 383.614ZM334.877 377.9C339.115 377.998 349.65 378.79 359.763 383.7L360.637 381.9C350.15 376.81 339.285 376.002 334.923 375.9L334.877 377.9ZM334.5 377.9H334.9V375.9H334.5V377.9ZM333.4 377.9H334.5V375.9H333.4V377.9ZM332.8 377.9H333.4V375.9H332.8V377.9ZM309.525 382.805C314.316 380.556 322.171 377.9 332.8 377.9V375.9C321.828 375.9 313.684 378.644 308.675 380.995L309.525 382.805ZM303.81 386.112C305.873 385.184 307.831 384.05 309.685 382.711L308.514 381.089C306.769 382.35 304.927 383.416 302.99 384.288L303.81 386.112ZM293.9 388.2C297.343 388.2 300.678 387.469 303.798 386.117L303.002 384.282C300.121 385.531 297.056 386.2 293.9 386.2V388.2ZM262.2 346.5C262.2 357.946 265.683 368.337 271.376 375.889C277.07 383.443 285.018 388.2 293.9 388.2V386.2C285.782 386.2 278.38 381.857 272.973 374.685C267.567 367.513 264.2 357.554 264.2 346.5H262.2ZM265.4 331.3C264.482 330.904 264.482 330.904 264.481 330.905C264.481 330.905 264.481 330.905 264.481 330.905C264.481 330.906 264.481 330.907 264.48 330.907C264.48 330.909 264.479 330.911 264.478 330.913C264.476 330.917 264.474 330.922 264.471 330.929C264.465 330.943 264.458 330.961 264.448 330.985C264.429 331.031 264.403 331.098 264.37 331.185C264.304 331.359 264.213 331.613 264.105 331.946C263.889 332.613 263.605 333.598 263.323 334.901C262.758 337.506 262.2 341.377 262.2 346.5H264.2C264.2 341.523 264.742 337.794 265.277 335.324C265.545 334.089 265.811 333.168 266.007 332.563C266.106 332.261 266.186 332.037 266.241 331.892C266.268 331.82 266.289 331.767 266.302 331.735C266.309 331.718 266.314 331.707 266.316 331.701C266.318 331.697 266.318 331.695 266.319 331.695C266.319 331.694 266.319 331.694 266.319 331.694C266.319 331.694 266.319 331.695 266.319 331.695C266.319 331.695 266.318 331.695 266.318 331.695C266.318 331.696 266.318 331.696 265.4 331.3ZM267.306 323.853C266.731 325.003 266.015 326.796 265.453 328.269C265.17 329.012 264.921 329.685 264.743 330.173C264.654 330.417 264.583 330.615 264.534 330.752C264.509 330.82 264.49 330.873 264.477 330.91C264.471 330.928 264.466 330.942 264.463 330.951C264.461 330.956 264.46 330.96 264.459 330.962C264.458 330.963 264.458 330.964 264.458 330.965C264.458 330.965 264.457 330.966 264.457 330.966C264.457 330.966 264.457 330.966 264.457 330.966C264.457 330.966 264.457 330.966 265.4 331.3C266.343 331.634 266.343 331.634 266.343 331.634C266.343 331.634 266.343 331.634 266.343 331.634C266.343 331.634 266.343 331.633 266.343 331.633C266.343 331.633 266.343 331.632 266.344 331.631C266.344 331.629 266.346 331.625 266.347 331.621C266.35 331.612 266.355 331.599 266.361 331.581C266.374 331.546 266.392 331.494 266.416 331.427C266.465 331.293 266.535 331.098 266.622 330.858C266.798 330.377 267.043 329.713 267.322 328.981C267.885 327.504 268.569 325.797 269.094 324.747L267.306 323.853ZM274.501 290.647C274.99 301.119 270.466 315.444 267.264 323.948L269.136 324.652C272.334 316.156 277.009 301.481 276.499 290.553L274.501 290.647ZM274 284.6C274 286.567 274.207 288.619 274.51 290.741L276.49 290.458C276.193 288.381 276 286.433 276 284.6H274ZM274.4 261.3C273.401 261.257 273.401 261.257 273.401 261.257C273.401 261.257 273.401 261.258 273.401 261.258C273.401 261.258 273.401 261.259 273.401 261.26C273.401 261.262 273.4 261.266 273.4 261.27C273.4 261.278 273.399 261.29 273.399 261.306C273.398 261.337 273.396 261.384 273.393 261.445C273.388 261.567 273.381 261.747 273.373 261.978C273.356 262.44 273.334 263.107 273.311 263.928C273.266 265.572 273.219 267.837 273.212 270.322C273.2 275.262 273.347 281.177 274.017 284.783L275.983 284.417C275.353 281.023 275.2 275.288 275.212 270.327C275.219 267.863 275.265 265.615 275.31 263.984C275.333 263.168 275.355 262.507 275.372 262.05C275.38 261.822 275.387 261.644 275.392 261.524C275.394 261.464 275.396 261.419 275.397 261.388C275.398 261.373 275.398 261.361 275.399 261.354C275.399 261.35 275.399 261.347 275.399 261.345C275.399 261.344 275.399 261.344 275.399 261.343C275.399 261.343 275.399 261.343 275.399 261.343C275.399 261.343 275.399 261.343 274.4 261.3ZM276.582 251.424C274.574 254.278 273.4 257.576 273.4 261.3H275.4C275.4 258.023 276.426 255.122 278.218 252.575L276.582 251.424ZM325.986 273.904C305.391 272.121 287.87 263.414 278.179 251.373L276.621 252.627C286.73 265.186 304.808 274.078 325.814 275.896L325.986 273.904ZM333.9 274.4C331.248 274.4 328.588 274.203 326.015 273.906L325.785 275.893C328.412 276.196 331.152 276.4 333.9 276.4V274.4ZM341.748 273.912C339.221 274.3 336.58 274.4 333.9 274.4V276.4C336.62 276.4 339.378 276.3 342.052 275.888L341.748 273.912ZM389.718 251.276C380.028 263.414 362.509 272.121 341.814 273.904L341.986 275.896C363.091 274.079 381.172 265.186 391.281 252.524L389.718 251.276ZM394.5 261.2C394.5 257.58 393.328 254.181 391.318 251.324L389.682 252.475C391.472 255.019 392.5 258.02 392.5 261.2H394.5ZM393.883 284.683C394.553 281.077 394.7 275.162 394.687 270.222C394.681 267.737 394.634 265.472 394.589 263.829C394.566 263.007 394.544 262.34 394.527 261.878C394.518 261.647 394.512 261.467 394.507 261.345C394.504 261.284 394.502 261.237 394.501 261.206C394.5 261.19 394.5 261.178 394.5 261.17C394.499 261.166 394.499 261.162 394.499 261.16C394.499 261.159 394.499 261.159 394.499 261.158C394.499 261.158 394.499 261.157 394.499 261.157C394.499 261.157 394.499 261.157 393.5 261.2C392.501 261.243 392.501 261.243 392.501 261.243C392.501 261.243 392.501 261.243 392.501 261.243C392.501 261.244 392.501 261.244 392.501 261.245C392.501 261.247 392.501 261.25 392.501 261.254C392.502 261.261 392.502 261.273 392.503 261.288C392.504 261.319 392.506 261.364 392.508 261.424C392.513 261.544 392.52 261.722 392.528 261.95C392.545 262.407 392.567 263.068 392.589 263.884C392.635 265.515 392.681 267.763 392.687 270.227C392.7 275.188 392.547 280.923 391.917 284.317L393.883 284.683ZM392.5 290.4C393.495 290.499 393.495 290.499 393.495 290.499C393.495 290.499 393.495 290.499 393.495 290.499C393.495 290.499 393.495 290.499 393.495 290.498C393.495 290.498 393.495 290.497 393.495 290.496C393.496 290.494 393.496 290.491 393.496 290.487C393.497 290.479 393.498 290.468 393.5 290.452C393.503 290.422 393.507 290.378 393.512 290.321C393.524 290.206 393.539 290.041 393.558 289.837C393.596 289.43 393.646 288.867 393.697 288.243C393.796 287.008 393.9 285.495 393.9 284.5H391.9C391.9 285.404 391.803 286.842 391.703 288.082C391.654 288.696 391.604 289.251 391.567 289.653C391.548 289.854 391.533 290.016 391.522 290.128C391.516 290.184 391.512 290.227 391.509 290.257C391.508 290.271 391.507 290.282 391.506 290.29C391.506 290.293 391.505 290.296 391.505 290.298C391.505 290.299 391.505 290.299 391.505 290.3C391.505 290.3 391.505 290.3 391.505 290.3C391.505 290.3 391.505 290.3 391.505 290.3C391.505 290.3 391.505 290.3 392.5 290.4ZM402.146 327.576C400.851 323.79 398.684 317.115 396.843 310.06C394.994 302.978 393.5 295.611 393.5 290.4H391.5C391.5 295.889 393.056 303.472 394.907 310.565C396.766 317.685 398.949 324.41 400.254 328.224L402.146 327.576ZM402.3 331.2C403.257 330.909 403.257 330.909 403.257 330.909C403.257 330.909 403.257 330.909 403.257 330.909C403.257 330.908 403.256 330.908 403.256 330.908C403.256 330.908 403.256 330.907 403.256 330.907C403.256 330.906 403.255 330.904 403.254 330.902C403.253 330.897 403.251 330.89 403.248 330.881C403.243 330.864 403.235 330.838 403.225 330.805C403.205 330.74 403.176 330.645 403.139 330.528C403.067 330.295 402.966 329.973 402.852 329.619C402.628 328.922 402.343 328.065 402.128 327.529L400.271 328.271C400.457 328.734 400.722 329.528 400.948 330.231C401.059 330.577 401.158 330.893 401.229 331.122C401.265 331.236 401.294 331.329 401.313 331.393C401.323 331.425 401.331 331.45 401.336 331.466C401.338 331.475 401.34 331.481 401.341 331.485C401.342 331.487 401.343 331.489 401.343 331.49C401.343 331.49 401.343 331.491 401.343 331.491C401.343 331.491 401.343 331.491 401.343 331.491C401.343 331.491 401.343 331.491 401.343 331.491C401.343 331.491 401.343 331.491 402.3 331.2ZM403.458 331.663C403.38 331.404 403.32 331.2 403.281 331.004L401.319 331.396C401.38 331.7 401.47 331.996 401.542 332.237L403.458 331.663ZM292.9 397.2C295.972 397.2 298.798 396.729 300.892 395.934C301.935 395.538 302.849 395.042 303.519 394.44C304.189 393.839 304.7 393.05 304.7 392.1H302.7C302.7 392.282 302.607 392.572 302.183 392.952C301.761 393.331 301.093 393.718 300.182 394.064C298.367 394.753 295.793 395.2 292.9 395.2V397.2ZM281.1 392.1C281.1 393.05 281.611 393.839 282.281 394.44C282.951 395.042 283.865 395.538 284.908 395.934C287.003 396.729 289.828 397.2 292.9 397.2V395.2C290.007 395.2 287.433 394.753 285.618 394.064C284.707 393.718 284.039 393.331 283.617 392.952C283.194 392.572 283.1 392.282 283.1 392.1H281.1ZM292.9 387C289.828 387 287.003 387.471 284.908 388.266C283.865 388.662 282.951 389.158 282.281 389.76C281.611 390.361 281.1 391.15 281.1 392.1H283.1C283.1 391.918 283.194 391.628 283.617 391.248C284.039 390.869 284.707 390.482 285.618 390.136C287.433 389.447 290.007 389 292.9 389V387ZM304.7 392.1C304.7 391.15 304.189 390.361 303.519 389.76C302.849 389.158 301.935 388.662 300.892 388.266C298.798 387.471 295.972 387 292.9 387V389C295.793 389 298.367 389.447 300.182 390.136C301.093 390.482 301.761 390.869 302.183 391.248C302.607 391.628 302.7 391.918 302.7 392.1H304.7ZM386.3 392.1C386.3 392.282 386.206 392.572 385.783 392.952C385.361 393.331 384.693 393.718 383.782 394.064C381.967 394.753 379.393 395.2 376.5 395.2V397.2C379.572 397.2 382.397 396.729 384.492 395.934C385.535 395.538 386.449 395.042 387.119 394.44C387.789 393.839 388.3 393.05 388.3 392.1H386.3ZM376.5 389C379.393 389 381.967 389.447 383.782 390.136C384.693 390.482 385.361 390.869 385.783 391.248C386.206 391.628 386.3 391.918 386.3 392.1H388.3C388.3 391.15 387.789 390.361 387.119 389.76C386.449 389.158 385.535 388.662 384.492 388.266C382.397 387.471 379.572 387 376.5 387V389ZM366.7 392.1C366.7 391.918 366.794 391.628 367.217 391.248C367.639 390.869 368.307 390.482 369.218 390.136C371.033 389.447 373.607 389 376.5 389V387C373.428 387 370.602 387.471 368.508 388.266C367.465 388.662 366.551 389.158 365.881 389.76C365.211 390.361 364.7 391.15 364.7 392.1H366.7ZM376.5 395.2C373.607 395.2 371.033 394.753 369.218 394.064C368.307 393.718 367.639 393.331 367.217 392.952C366.794 392.572 366.7 392.282 366.7 392.1H364.7C364.7 393.05 365.211 393.839 365.881 394.44C366.551 395.042 367.465 395.538 368.508 395.934C370.602 396.729 373.428 397.2 376.5 397.2V395.2Z"
                        fill="black"/>
                    <path
                        d="M342.9 292.5C341.8 294.9 340.9 297.3 340.2 299.6C339.5 302 339 304.3 338.6 306.7C338.6 306.7 336.7 316.6 336.6 324.4C336 332.3 339 339.5 345.1 342.8C347.4 344 349.8 344.6 352.4 344.6C357.4 344.6 362.7 342.3 367.2 338.3C370.3 335.8 373.5 332.4 375.9 329.8C378.3 327.1 380 325.1 380 325.1C382.9 321.8 385.4 317.9 387.5 313.5C390.7 306.6 392.3 299.5 392.3 293.1"
                        stroke="black" stroke-width="2" stroke-miterlimit="10"/>
                    <path
                        d="M324.8 292.2C325.9 294.6 326.8 297 327.5 299.3C328.2 301.7 328.7 304 329.1 306.4C329.1 306.4 331 316.3 331.1 324.1C331.7 332 328.7 339.2 322.6 342.5C320.3 343.7 317.9 344.3 315.3 344.3C310.3 344.3 305 342 300.5 338C297.4 335.5 294.2 332.1 291.8 329.5C289.4 326.8 287.7 324.8 287.7 324.8C284.8 321.5 282.3 317.6 280.2 313.2C277 306.3 275.4 299.2 275.4 292.8"
                        stroke="black" stroke-width="2" stroke-miterlimit="10"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M349.2 98.9C356 82.3 361 65.6 362.6 50.3C362.9 47.2 359.4 45.1 356.9 47C340.6 58.6 326 75.6 312.5 95.5C325.1 100.8 336.6 101.4 349.2 98.9ZM453.7 134.4C471.6 133.4 488.5 134.7 503.6 138.1C506.6 138.8 507.5 142.3 505 144C488.8 155.7 468.1 164.1 444.9 170.5C443.9 156.8 447.3 145.5 453.7 134.4Z"
                          fill={svg_e4} id="svg-e4"/>
                    <path
                        d="M362.6 50.3L363.595 50.404L363.595 50.3963L362.6 50.3ZM349.2 98.9L349.395 99.8809L349.922 99.7763L350.125 99.2791L349.2 98.9ZM356.9 47L357.48 47.8148L357.493 47.8057L357.505 47.7962L356.9 47ZM312.5 95.5L311.672 94.9386L310.987 95.9486L312.112 96.4218L312.5 95.5ZM503.6 138.1L503.827 137.126L503.82 137.124L503.6 138.1ZM453.7 134.4L453.644 133.402L453.104 133.432L452.834 133.9L453.7 134.4ZM505 144L504.438 143.173L504.426 143.181L504.415 143.189L505 144ZM444.9 170.5L443.903 170.573L443.991 171.788L445.166 171.464L444.9 170.5ZM361.605 50.196C360.019 65.3675 355.054 81.9703 348.275 98.5209L350.125 99.2791C356.946 82.6297 361.981 65.8325 363.595 50.404L361.605 50.196ZM357.505 47.7962C359.252 46.4682 361.828 47.8984 361.605 50.2037L363.595 50.3963C363.972 46.5017 359.548 43.7319 356.295 46.2039L357.505 47.7962ZM313.328 96.0614C326.795 76.2088 341.317 59.3172 357.48 47.8148L356.32 46.1853C339.883 57.8828 325.205 74.9912 311.672 94.9386L313.328 96.0614ZM349.005 97.9191C336.575 100.385 325.281 99.7913 312.888 94.5782L312.112 96.4218C324.919 101.809 336.625 102.415 349.395 99.8809L349.005 97.9191ZM503.82 137.124C488.619 133.702 471.626 132.397 453.644 133.402L453.756 135.398C471.575 134.403 488.381 135.698 503.38 139.076L503.82 137.124ZM505.562 144.827C507.161 143.74 507.72 142.013 507.334 140.437C506.953 138.881 505.679 137.558 503.827 137.126L503.373 139.074C504.521 139.342 505.197 140.119 505.391 140.913C505.581 141.686 505.339 142.56 504.438 143.173L505.562 144.827ZM445.166 171.464C468.423 165.048 489.25 156.608 505.586 144.811L504.415 143.189C488.35 154.792 467.777 163.152 444.634 169.536L445.166 171.464ZM452.834 133.9C446.353 145.14 442.886 156.637 443.903 170.573L445.897 170.427C444.915 156.962 448.247 145.86 454.566 134.899L452.834 133.9Z"
                        fill="black"/>
                    <path
                        d="M305 219.7C312.677 219.7 318.9 213.477 318.9 205.8C318.9 198.123 312.677 191.9 305 191.9C297.323 191.9 291.1 198.123 291.1 205.8C291.1 213.477 297.323 219.7 305 219.7Z"
                        fill="black"/>
                    <path
                        d="M307.9 207.1C310.772 207.1 313.1 204.772 313.1 201.9C313.1 199.028 310.772 196.7 307.9 196.7C305.028 196.7 302.7 199.028 302.7 201.9C302.7 204.772 305.028 207.1 307.9 207.1Z"
                        fill="white"/>
                    <path
                        d="M362.6 219.7C370.277 219.7 376.5 213.477 376.5 205.8C376.5 198.123 370.277 191.9 362.6 191.9C354.923 191.9 348.7 198.123 348.7 205.8C348.7 213.477 354.923 219.7 362.6 219.7Z"
                        fill="black"/>
                    <path
                        d="M359.7 207.1C362.572 207.1 364.9 204.772 364.9 201.9C364.9 199.028 362.572 196.7 359.7 196.7C356.828 196.7 354.5 199.028 354.5 201.9C354.5 204.772 356.828 207.1 359.7 207.1Z"
                        fill="white"/>
                    <path
                        d="M326.9 240C326.7 240 326.5 240 326.3 240C322 239.7 319.4 236.1 319.3 236C318.8 235.3 319 234.4 319.6 234C320.3 233.5 321.2 233.7 321.6 234.3C321.6 234.3 323.6 236.9 326.5 237.1C328.5 237.3 330.6 236.2 332.8 234.1C333.4 233.5 334.3 233.5 334.9 234.1C337 236.2 339.2 237.2 341.2 237.1C344.1 236.9 346.1 234.3 346.1 234.3C346.6 233.6 347.5 233.5 348.1 234C348.8 234.5 348.9 235.4 348.4 236C348.3 236.2 345.7 239.7 341.4 240C338.8 240.2 336.3 239.2 333.9 237.1C331.5 239 329.2 240 326.9 240Z"
                        fill="black"/>
                    <path
                        d="M333.9 222.2C332.1 222.2 330.3 221.3 328.6 219.6C328 219 328 218.1 328.6 217.5C329.2 216.9 330.1 216.9 330.7 217.5C331.9 218.7 333.1 219.3 334.1 219.2C335.6 219.1 336.7 217.7 336.7 217.7C337.2 217 338.1 216.9 338.7 217.4C339.4 217.9 339.5 218.8 339 219.4C338.9 219.5 337.1 221.9 334.2 222.1C334.2 222.2 334 222.2 333.9 222.2Z"
                        fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M301 230.8C301 238.145 295.045 244.1 287.7 244.1C280.355 244.1 274.4 238.145 274.4 230.8C274.4 223.455 280.355 217.5 287.7 217.5C295.045 217.5 301 223.455 301 230.8ZM393.1 230.8C393.1 238.145 387.145 244.1 379.8 244.1C372.455 244.1 366.5 238.145 366.5 230.8C366.5 223.455 372.455 217.5 379.8 217.5C387.145 217.5 393.1 223.455 393.1 230.8Z"
                          fill={svg_e5} id="svg-e5"/>
                    <path
                        d="M287.7 245.1C295.598 245.1 302 238.698 302 230.8H300C300 237.593 294.493 243.1 287.7 243.1V245.1ZM273.4 230.8C273.4 238.698 279.802 245.1 287.7 245.1V243.1C280.907 243.1 275.4 237.593 275.4 230.8H273.4ZM287.7 216.5C279.802 216.5 273.4 222.902 273.4 230.8H275.4C275.4 224.007 280.907 218.5 287.7 218.5V216.5ZM302 230.8C302 222.902 295.598 216.5 287.7 216.5V218.5C294.493 218.5 300 224.007 300 230.8H302ZM379.8 245.1C387.698 245.1 394.1 238.698 394.1 230.8H392.1C392.1 237.593 386.593 243.1 379.8 243.1V245.1ZM365.5 230.8C365.5 238.698 371.902 245.1 379.8 245.1V243.1C373.007 243.1 367.5 237.593 367.5 230.8H365.5ZM379.8 216.5C371.902 216.5 365.5 222.902 365.5 230.8H367.5C367.5 224.007 373.007 218.5 379.8 218.5V216.5ZM394.1 230.8C394.1 222.902 387.698 216.5 379.8 216.5V218.5C386.593 218.5 392.1 224.007 392.1 230.8H394.1Z"
                        fill="black"/>
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="738" height="462" fill="white"/>
                    </clipPath>
                </defs>
            </svg>

        </>
    );
};

export default Pikachu;