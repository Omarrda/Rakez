// components.js

const SVGS = {
    // This is your new vector logo. Change width/height here or in CSS.
    logo: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 1000 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <use xlink:href="#_plogo" x="12.5" y="9.877" width="975px" height="279px"/>
    <defs>
        <image id="_plogo" width="975px" height="279px" xlink:href="data:image/png;base64,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"/>
    </defs>
</svg>

`,
    dashboard: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <rect x="0" y="0" width="256" height="256" style="fill:none;"/>
    <use xlink:href="#_phome" x="15" y="2" width="180px" height="200px"/>
    <defs>
        <image id="_phome" width="240px" height="240px" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAADICAYAAABBLcuIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAC9klEQVR4nO3dwYkTYRiA4W80iLAnETxZgRXYgH1sF1uBDViBFdiHFdiAJ0EET97GwwbxsO5GHZLw5nkgEGYyM3/g5b99zDL8l6sP6zozM8vMsuwPLvvPb9/vOzezP7/MfH/z65f8g0enXgBsSdCkCJoUQZMiaFIETYqgSRE0KYImRdCkCJoUQZMiaFIETYqgSRE0KYImRdCkCJqUi5tfe/p+XWfZ//EH5vvuPXfH9VvMFG5532Vmvr2+rBlFOzQpgiZF0KQImhRBkyJoUgRNiqBJETQpgiZF0KQImhRBkyJoUgRNiqBJETQpgiZF0KSc/bzZk3e3M4AHz+EdMKN3STOFf3rendce8Myvr857RtEOTYqgSRE0KYImRdCkCJoUQZMiaFIETYqgSRE0KYImRdCkCJoUQZMiaFIETYqgSRE0Kbutb/j47brOzCbza+c/8Xh5nn9a1y3nMb+83HZG0Q5NiqBJETQpgiZF0KQImhRBkyJoUgRNiqBJETQpgiZF0KQImhRBkyJoUgRNiqBJETQpu7nZvwdwZpt34sFfePH5tr+D3+P4wKyiHZoUQZMiaFIETYqgSRE0KYImRdCkCJoUQZMiaFIETYqgSRE0KYImRdCkCJoUQZMiaFIETYqgSRE0KYImRdCkCJoUQZMiaFIETYqgSRE0KYImRdCkCJoUQZMiaFIETYqgSRE0KYImRdCkCJoUQZMiaFIETYqgSRE0KYImRdCkCJoUQZMiaFIETYqgSRE0KYImRdCkCJoUQZMiaFJ2p17Asf24XpZTr+GYnn1c11Ov4Zjs0KQImhRBkyJoUgRNiqBJETQpgiZF0KQImhRBkyJoUgRNiqBJETQpgiZF0KQImhRBkyJoUgRNiqBJETQpgiZF0KQImhRBkyJoUgRNiqBJETQpgiZF0KQImhRBkyJoUgRNiqBJETQpgiZF0KQImhRBkyJoUgRNiqBJETQpgiZF0KQImhRBkyJoUgRNiqBJETQpgiZF0KQImhRBk/ITtbsd6HlnRNMAAAAASUVORK5CYII="/></defs></svg>
`,
    notebook: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <rect x="0" y="0" width="256" height="256" style="fill:none;"/>
    <use xlink:href="#_pnotebook" x="30.5" y="30.5" width="195px" height="195px"/>
    <defs>
        <image id="_pnotebook" width="195px" height="195px" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAADDCAYAAAA/f6WqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACm0lEQVR4nO3cQY4SQRiA0aoJceHW23kRt3MH7+CRPIpLy4WfpEOA2DAOwby3oekfQnXCl9p0eo4va405fptjzM3x8fXW+ZnP3jOfp+dOjueVde2aX7jGa/OL696u/V/Pb1j3xfn22u6dX/nPXFv3TfM9/5mT+csAxhhigCMxQMQAEQNEDBAxQMQAEQNEDBAxQMQAEQNEDJDDPV/++Xq8Ofddffi61iN+l/+bnQEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIIdHL+CZ/Pg856PX8Cw+fV/r0WvYy84AEQNEDBAxQMQAEQNEDBAxQMQAEQNEDBAxQMQAEQPELdw7fPy21phjjD83cm9e5/bcmeN3mZ9Z15i93TvfXtst8ydkZ4CIASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIAeIW7h08hfvveQo3PDExQMQAEQNEDBAxQMQAEQNEDBAxQMQAEQNEDBAxQNzCvYOncO+YPyE7A0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFAxAARA0QMEDFADvd8+eV1rTHHGLMTc4y5Od6ef4v53J6DN2ZngIgBIgaIGCBigIgBIgaIGCBigIgBIgaIGCBigIgB8gtxJBmGTUfJMQAAAABJRU5ErkJggg=="/></defs></svg>
`,
    analytics: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <rect x="0" y="0" width="256" height="256" style="fill:none;"/>
    <use xlink:href="#_panalytics" x="18" y="38" width="220px" height="180px"/>
    <defs>
        <image id="_panalytics" width="220px" height="180px" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAAC0CAYAAAD//UK2AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACzUlEQVR4nO3VMY7TQBiA0ZnVNnTUHIizcAN6zsJVOAwt3VamiAmLlTiJMB8gvSdF40l+xXaUT54DHvD2y7KMuW7m+hpjzNfvbdc7Z+a1z+6ZeXV85MzXd+erPsTTkV8G7BMchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHoee/fQH/uzefl2WMMcY87ef8eXxtPWRmrtudmTnH+PZ+/niHf4AnHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQej56C98+rQsY56O57qOub7Gr+vc7H975sJn25mXD+ergpwnHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBaI6PyzLmeXdaNvsxN8fbmUvzd8zMG+d4eObKdRw1c/c975zjsJlLv832fm6c45CZvf/MgzO37md3Zu8/84dmHu5keMJBSnAQEhyEBAchwUFIcBASHIQEByHBQUhwEBIchAQHIcFBSHAQEhyEBAchwUFIcBASHIS+A/TIEHPV+kHqAAAAAElFTkSuQmCC"/></defs></svg>
`,
    vault: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <rect x="0" y="0" width="256" height="256" style="fill:none;"/>
    <use xlink:href="#_pvault" x="5.5" y="38" width="195px" height="180px"/>
    <defs>
        <image id="_pvault" width="220px" height="220" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAAC0CAYAAAApWJjTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADDklEQVR4nO3cP4oTcRiA4fnJVqKFWNhbWtta22rrHay9gwextvUO1t5BRET8U1g4FvsaQ9xEM8EdFp8Hlgnz7ZIJ2ZdpPmZMz+Z5GtO5MU1j6/XmuHR+we+eMh+753ZejwPXddR8z2c8NN973dvX/q/nC65773z7s506P/A/c+i6F82P+Z/ZmV+bgGmaxAAbYoCIASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIAXK29gX8Lz4/GmPtazjWrdfzvPY1XCZ3BogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIFa4j/D1yTpr2DdfzfPmnUc/O6/H7vlf82vjor/bOnfhfEzTh/vLP+/tN1dv/dudASIGiBggYoCIASIGiBggYoCIASIGiBggYoCIASIGiBXuS3LjZSvNh1awD8xP8P2Ev1387u/vrbPufuft8tVxdwaIGCBigIgBIgaIGCBigIgBIgaIGCBigIgBIgaIGCBWuC/J50fLV5pvvlq+lvzxwTqr1JuncI+d9fSfxz8/PXz5fCF3BogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBogYIFa4j3D9xTz/9pTsjn96ivaXx8tXqT89XGcN+9br8887pmn/08H3za8gdwaIGCBigIgBIgaIGCBigIgBIgaIGCBigIgBIgaIGCBWuC/JjZe/nkq992nSp873PK1674r1ofkVXcM+hTsDRAwQMUDEABEDRAwQMUDEABEDRAwQMUDEABEDRAwQMUDEABEDRAwQMUDEABEDRAwQMUDEABEDRAwQMUDEABEDRAwQMUDEABEDRAwQMUDEABEDRAwQMUDEABEDRAwQMUDEABlrvfHZ83nevPvWcWyf25mPzn17Ola7bv7O7TfzPE3T79/pz+POd7o9f3d3ne/XnQEiBogYIGKAiAEiBogYIGKAiAEiBogYIGKAiAEiBsgPvWYz5eApWcAAAAAASUVORK5CYII="/></defs></svg>
`,
    quiz: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 225 195" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-15.5,-30.5)">
        <g transform="matrix(1,-0,-0,1,15.5,30.5)">
            <use xlink:href="#_pbrain" x="0" y="0" width="225px" height="195px"/>
        </g>
    </g>
    <defs>
        <image id="_pbrain" width="225px" height="195px" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADDCAYAAAB013ZHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEaElEQVR4nO3dP29bVRyA4XObViChClEhurVjx458BNaOjIyMbIipYsrakZGv0ZGRsSMjbERVGSgVCIEZ4kbBcezkOvStyfMMvXH689/rN3c6OtPYQ7eeLBZjjDGm5S+m5Y+nbv/r5/Nm1syeO3NqduvMGGM65zWcmdnwel/PvHx0Mnlpt58ef1bTlve0dWZ5vNDMyuNe6Fxc0fl6/mD+Z1W5Ub8AuO5ECDERQkyEEBMhxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECLGb1RMfHC4Wl172sneLVHjTPvzh+Hs1xrj40rPlzNH9ZhmUKyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCTIQQEyHERAixbClT5Y/P5y9Xeffb5W5QbPXLx/M/5zvPrtfn7EoIMRFCTIQQEyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCbKelTDcer+yAs3KcNu2EA2+Zj35aLqE65/s6bdg97Oe785duuRJCTIQQEyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCTIQQuzm+PLscaeMSpNWZ+d6be8c/v5he7fzsvLVePLyCb9cMJ0uZZrh7dHzfaU0r2/pyJYSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCG2065MO/pt7h1vPVmuODm9A9TK7bW7RK3OrJk9d4ZL+eD7LTt2rf7+vzhf0yVnIq6EEBMhxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCTIQQK3dlqizm3vH3z6a9+6P16yfT3u0pdefZYvY52kd796WC/xsRQkyEEBMhxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECDERQmynZS43Hi8WJ4+w5jht+L+Tmde3r2pmw+yZmTWz586cmt06M5bv/SIzW97bNI3x8tH85Ui3ny5+PPNcq8d1r+f4eG919srP6YbZN3a+ruacHpzMbHhPZ2aGKyHkRAgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCTIQQEyHERAixnXZl+vvr+UtsDg6v1847oXv1C9gXR/eaHaxcCSEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQojttJRpF3991SwbeecbS6jedi8eNt+NiishxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIsWwp08HhYjGmMaYxjv95vXhlzfFSMxtmr9X6mD1259nKd2P1uOm8r5m96MzRfbsywbUkQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQojt5eqeW0+WOyvNWcr0JpbGjDGmlcd99en+7TT0/ndrPuct7/vKl55d8nw9f7B/n7MrIcRECDERQkyEEBMhxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECLF/ABowVt7cKiKsAAAAAElFTkSuQmCC"/></defs></svg>
`,
    export: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 183 233" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-36.503452,-11.549848)">
        <g id="_pexportt" transform="matrix(1.109049,0,0,1.109049,36.503452,11.549848)">
            <use xlink:href="#_pexport" x="0" y="0" width="165px" height="210px"/>
        </g>
    </g>
    <defs>
        <image id="_pexport" width="165px" height="210px" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAADSCAYAAAArDACjAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADX0lEQVR4nO3dsWoTcRzA8TupiAREfAd3d3ed3d19AAefwgdwd+/u7u6DiEhFRBzOJTbX0Ng0bblv6ecDgRzXJJd/v9z0459xYG+r42kax/XBOHusj8et4/n5Hy9PX8kF7i19AbBNlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJzp0bp3r4cZqGYbhw1Gw8ZzTt9DXn/P1Nvt/353dr7M2dkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5R0tfwCEefNiMn52OgG0dz8/Pz/16ffgY2Op4/bkHOHlx+Oc+/jxNO7/r/Pk56/Dt2e0be3OnJEeU5IiSHFGSI0pyREmOKMkRJTmiJEeU5IiSHFGSI0pyREnOYqNr99+fHccahs3zXTuR/duF7Peb2zeOdRVX2XXtyZfNOl+0rtv/h69Pl1lnd0pyREmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMkRJTmiJEeU5Cw2uvbn7d0aP1uKXdfgGoiSHFGSI0pyREmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMk5Gt6td+Uahs3OXHv8EOX8/K7dvK77/XbtDnaZHwzd59p2fdbPV4ePgT36NNtlbo/vuvfa/e/cDa7rZdfuMu/nTkmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMkRJTlHS1/AbbI6nqZxXB+Ms8f6eNw6PnOevblTkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkiNKcv4CZvsrJW2AH30AAAAASUVORK5CYII="/>
    </defs>
</svg>
`,
    settings: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <rect x="0" y="0" width="256" height="256" style="fill:none;"/>
    <use xlink:href="#_psettings" x="37.282" y="37.282" width="182px" height="182px"/>
    <defs>
        <image id="_psettings" width="182px" height="182px" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAAC2CAYAAAB08HcEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEJ0lEQVR4nO3dPYhcVRjH4fcsq+RDVIIS0Eqws0qw1UKwT2VhJbGwStpAKqtAWlMJItoEsTGNWIt1OkEMgoUgkdWIIagY8FpklCX7fTJz79y/zwMDuzOcvW/Cb5dbHO5pxdKc/Gx4tbX6strijbZ4Lb5ue7xfbfHtLu//+33b7bNH+bmHWbvzs2u/vNQuHvw/Mb2NqQeAVRA2kYRNJGETSdhEEjaRhE0kYRNJ2EQSNpGETSRhE2lz6gHW1Ynrw8Zem5L22VjUah6Gxeuo/l72IKsi7F2cuD6craqbU8+xQh/9+nI7P/UQq+RWhEjCJpKwiSRsIgmbSMImkrCJJGwiCZtIwiaSsIkkbCJFb4I69sGwUa2e2O3xXvs9MqyqTo425KO5X1V/dKzrWTMr0WFX1YtV9e3UQ6zQjd9eaW9MPcQ6citCJGETSdhEEjaRhE0kYRNJ2EQSNpGETSRhE0nYRBI2kdI3QTFjp28PT27fnXmEQ1y3hM06u1RVlzvWnXErQiRhE0nYRBI2kYRNJGETSdhEEjaRhE0kYRNJ2EQSNpFsgmLlnv1+OFVVzxx4svHOz071XlPYjOGdqroy5gXdihBJ2EQSNpGETSRhE0nYRBI2kYRNJGETSdhEEjaRhE0km6Dm7emnvhrOtr1OGN5vJ93i633Xdv7cHc/Yq3qu/5/YR9jz9vrixUPcihBJ2EQSNpGETSRhE0nYRBI2kYRNJGETSdhEEjaRhE0kYRNJ2EQSNpGETSRhE0nYRBI2kYRNJGETSdhEEjaRhE0kYRNJ2ESaxSPOHr82HKuq17af4FpVBz5frqqeH3FMlu9WVX3Xse7uLMKuB0cPfz71EIzu459Ot64Tfd2KEEnYRBI2kYRNJGETSdhEEjaRhE0kYRNJ2EQSNpGETaRRN0FtXh0eq1bnjnzK64NNUMzXN1X1dee6LmPv7jteVZ+OfE2md2PrhXZ5zAu6FSGSsIkkbCIJm0jCJpKwiSRsIgmbSMImkrCJJGwiCZtIXZugNt4dWlW99fCz9NoeO/S2PWPveP+os3C7qr6Yeog1dHPsC/bu7mtV9eEyBwlx6965dn7qIXArQihhE0nYRBI2kYRNJGETSdhEEjaRhE0kYRNJ2EQSNpE269Jw4bAn3f73jL38X4itqvqkY13PKbKswGZVvTf1EGvoh9/fbBenHoJ+6X95+Z8SNpGETSRhE0nYRBI2kYRNJGETSdhEEjaRhE0kYRNp7ANMx3anqt7vWPfjsgdhXOlh//zn2+OeCMt6cCtCJGETSdhEEjaRhE0kYRNJ2EQSNpGETSRhE0nYRBI2keayCepuVV3tWHdn2YMwD3MJ+95fF9qVqYdgPtyKEEnYRBI2kYRNJGETSdhEEjaRhE0kYRNJ2EQSNpGETaTNqjoz9RCHcH/qAZiXfwDos0v12D4egQAAAABJRU5ErkJggg=="/>
    </defs>
</svg>

`,
    logout: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <rect x="0" y="0" width="256" height="256" style="fill:none;"/>
    <use xlink:href="#_plogout" x="26" y="34.5" width="204px" height="187px"/>
    <defs>
        <image id="_plogout" width="204px" height="187px" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAAC7CAYAAAApBXGLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADDUlEQVR4nO3dMW7UQABAUU9EQZsCAS0cgpuk5haUiJtwnVyCmigFXUSFKdgEYy0b/ewqbJb3GjtjO7ZW+ppqNGP6MM/TmH7ZHMf4ff7HcXl9NbY8jh3PTmNzun72vuuLsbFl7CDfEN6x6ze6ubh7Oyfm7F9/ADwlgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAgeHaIf/LjowVT/B/MMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAcZAcyTtf55TxPt/vLLY9j8+dqbHnf2DK2vm/85dn1O67fHscud2YYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgLBQGABGU/Ciy/zPE3TXovYrl7vvwjNDAOBYCAQDASCgUAwEAgGAsFAIBgIBAOBYCAQDASCgUAwEAgGAsFAIBgILCBbef75145b++6uNXY8O43V9S333Xf9Ub5hOi0vvy4WoT3wNzLDQCAYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgILyFa+v99/l6pTcn65WXR1Aq5e2YEMHpVgIBAMBIKBQDAQCAYCwUAgGAgEA4FgIBAMBIKBQDAQCAYCwUAgGAgsIONJuH5zHAv7zDAQCAYCwUAgGAgEA4FgIBAMBIKBQDAQCAYCwUAgGAgEA4FgIBAMBIKBwAIydvr27jgWbh0LMwwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEB9mB7OzTPE+3+1SNaRqL87vj8vqWsXuvL8bGlrH1fQ/6hvCOsePZmwu7dp0qMwwEgoFAMBAIBgLBQCAYCAQDgWAgEAwEgoFAMBAIBgLBQCAYCAQDgWAg+AlRLCBQutwmuwAAAABJRU5ErkJggg=="/></defs></svg>
`
};

function renderSidebar(activePage) {
    const menuItems = [
        { name: 'Dashboard', link: 'options.html', icon: SVGS.dashboard, id: 'options' },
        { name: 'Smart Notebook', link: 'notebook.html', icon: SVGS.notebook, id: 'notebook' },
        { name: 'Analytics', link: 'analytics.html', icon: SVGS.analytics, id: 'analytics' },
        { name: 'Distraction Vault', link: 'vault.html', icon: SVGS.vault, id: 'vault' },
        { name: 'AI Quiz', link: 'quiz.html', icon: SVGS.quiz, id: 'quiz' },
        { name: 'Export Notes', link: 'export.html', icon: SVGS.export, id: 'export' },
    ];

    return `
    <aside class="sidebar">
        <div class="logo-area">
            ${SVGS.logo}
        </div>
        <nav class="nav-menu">
            ${menuItems.map(item => `
                <a href="${item.link}" class="nav-item ${activePage === item.id ? 'active' : ''}">
                    ${item.icon} ${item.name}
                </a>
            `).join('')}
        </nav>
        <div class="sidebar-footer">
            <a href="settings.html" class="nav-item ${activePage === 'settings' ? 'active' : ''}">
                ${SVGS.settings} Settings
            </a>
            <a href="#" id="logout-btn" class="nav-item">
                ${SVGS.logout} Log Out
            </a>
        </div>
    </aside>`;
}

function initLayout(activePageId) {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
        appContainer.insertAdjacentHTML('afterbegin', renderSidebar(activePageId));
    }
}