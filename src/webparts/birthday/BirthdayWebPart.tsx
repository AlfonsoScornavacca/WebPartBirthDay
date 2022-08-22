import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'BirthdayWebPartStrings';
import { Birthday } from './components/Birthday';
import { IBirthdayProps } from './components/IBirthdayProps';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';





export interface IBirthdayWebPartProps {
  description: string;
}
export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export default class BirthdayWebPart extends BaseClientSideWebPart<IBirthdayWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';


  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();


    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IBirthdayProps> = React.createElement(
      Birthday,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context:this.context,
        webURL:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }
  private _getDataList(): Promise<ISPList>{
    return this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + '/_api/web/lists/GetByTitle("Birthday")/items',
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
