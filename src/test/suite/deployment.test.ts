// import sinon = require('sinon');
// import { Deployment } from '../../deployment';
// import assert = require('assert');

// suite('Deployment', () => {
// 	function vscode() {
// 		return {
// 			workspace: {
// 				openTextDocument: sinon.stub(),
// 			}
// 		};
// 	}
// 	test('has function to get environments', async (done) => {
// 		const vscodeInstance = vscode();
// 		const document = { getText: sinon.stub() };
// 		document.getText.returns(`
// environments:
//   default:
//   other:
// `);
// 		vscodeInstance.workspace.openTextDocument.returns([document]);
// 		const deployment = new Deployment(vscodeInstance, 'deployment.test.yml');

// 		const environments = await deployment.getEnvironments();

// 		assert.equal(environments.length, 2);
// 		assert.deepEqual(environments, ['other', 'default']);

// 		done();
// 	});
// });
