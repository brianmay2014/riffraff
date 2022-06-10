import "./Footer.css";

function Footer() {
	return (
		<div className="footer-backer">
			<div className="footer">
				<div id="footer-top-row">
					<a
						href="https://reactjs.org/docs/getting-started.html"
						rel="noreferrer"
						target="_blank"
					>
						React
					</a>
					<a
						href="https://redux.js.org/"
						rel="noreferrer"
						target="_blank"
					>
						Redux
					</a>
					<a
						href="https://developer.mozilla.org/en-US/docs/Web/HTML"
						rel="noreferrer"
						target="_blank"
					>
						HTML
					</a>
					<a
						href="https://developer.mozilla.org/en-US/docs/Web/CSS"
						rel="noreferrer"
						target="_blank"
					>
						CSS
					</a>
					<a
						href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
						rel="noreferrer"
						target="_blank"
					>
						Javascript
					</a>
					<a
						href="https://docs.python.org/3/"
						rel="noreferrer"
						target="_blank"
					>
						Python
					</a>
					<a
						href="https://flask.palletsprojects.com/en/2.1.x/"
						rel="noreferrer"
						target="_blank"
					>
						Flask
					</a>
					<a
						href="https://wtforms.readthedocs.io/en/3.0.x/"
						rel="noreferrer"
						target="_blank"
					>
						WTForms
					</a>
					<a
						href="https://www.postgresql.org/docs/"
						rel="noreferrer"
						target="_blank"
					>
						PostgreSQL
					</a>
					<a
						href="https://docs.sqlalchemy.org/en/14/"
						rel="noreferrer"
						target="_blank"
					>
						SQLAlchemy
					</a>
					<a
						href="https://alembic.sqlalchemy.org/en/latest/"
						rel="noreferrer"
						target="_blank"
					>
						Alembic
					</a>
					<a
						href="https://docs.aws.amazon.com/s3/index.html"
						rel="noreferrer"
						target="_blank"
					>
						AWS S3
					</a>
				</div>
				<div id="footer-bottom-row">
						<a
							href="https://github.com/brianmay2014"
							rel="noreferrer"
							target="_blank"
							className="personal-link"
						>
							Github
						</a>
					<span>© 2022 Brian May</span>
					
						<a
							href="http://www.linkedin.com/in/brian-may-6aa49172"
							rel="noreferrer"
							target="_blank"
							className="personal-link"
						>
							LinkedIn
						</a>
					
				</div>
			</div>
		</div>
	);
}

export default Footer;
