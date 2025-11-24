const clickBack = new Audio('../assets/ClickSFX/pod_back.wav')
clickBack.volume = 0.3
const clickMove = new Audio('../assets/ClickSFX/pod_cursor_move.wav')
clickMove.volume = 0.3
const clickError = new Audio('../assets/ClickSFX/pod_error_01.wav')
clickError.volume = 0.3
const clickSelect = new Audio('../assets/ClickSFX/pod_select.wav')
clickSelect.volume = 0.3

document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.onClickSFX-back')) {
        clickBack.play();
    } else if (target.closest('.onClickSFX-move')) {
        clickMove.play();
    } else if (target.closest('.onClickSFX-error')) {
        clickError.play();
    } else if (target.closest('.onClickSFX-select')) {
        clickSelect.play();
    }
});