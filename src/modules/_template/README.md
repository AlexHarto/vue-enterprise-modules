# Module

This is a template suggestion for a module.

## Isolation

The main reason for using modules is to keep your code organized in isolated islands so you can easily reuse it in other projects.

---

## Folder structure

This folder structure is flexible and you can organize the content according to your needs or preferences.

Our recommendation is to keep consistency between modules so you can easily find things.

That's why we recommend separating the module content into two main folders, **infra** and **presentation**. If one of your modules gets large, you could have multiple presentation and infra folders, keeping the main structure and making it easier to locate code.

### `infra` folder

Typically, this folder will contain all the code related to the module's infrastructure, in other words, all the .ts or .js files.

As mentioned, this folder is optional, if you know in advance that none of your modules will not be large, you can directly drop your infrastructure subfolders directly into the module.

### `locales` folder

This folder is also optional but recommended because it will increase the usability of the module.

If you use it, make sure that contains at least the same languages included in the main locales (`/src/locales`).

### `presentation` folder

This folder contains all the module's .vue files and is organized into three subfolders, depending on the file's category: **layout**, **views** and **components**.

---

## More about **isolation**

Remember, whenever possible, to **avoid loading content from other modules**. Try to make them isolated.

If you need to share content between modules or reuse components, use generic folders at the root of the project (assets, components, composables, utils, etc.), and develop them as generic, as if they were part of a library of reusable components and utilities, ready to use in other projects.

Although, if you still need to use a component or anything from another module, you can still do it, export it in the **index.ts** file at the root of the module, but have in mind that they will couple.

You can also use Pinia to share content between modules or even exposed composables, always keeping isolation and reusability in mind.

_A good programmer writes less, but more readable and reusable code._
