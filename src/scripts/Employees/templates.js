//  <div class="wrapperSearch flex">
//  <form class="form-search" name="formSearch" action="/" method="post">
//      <input type="text" class="control-search" name="keyword" placeholder="Search...">
//      <button class="icon-search" type="button"></button>
//  </form>
//  <button class="btn btn-icon btn-add"> </button>
// </div>
const TemPlateHeaderTableEmployee = (selectorTable) => `
            <table class="${selectorTable}">
                <thead>
                    <tr>
                        <th>Of</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="table-body">

                </tbody>
            </table>
            `;

export { TemPlateHeaderTableEmployee };
