export const PasswordField = ({ label, value, setValue }) => {
    return <div className="form-group mb-3">
    <label htmlFor="value">{ label }</label>
    <input type="password"
        id="value"
        name="value"
        value={value}
        onChange={ event => setValue(event.target.value) }
        className="form-control" />
</div>
}