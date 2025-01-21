#import "RnAuth.h"
#import <AuthenticationServices/AuthenticationServices.h>

static NSString *const RCTNativeLocalStorageKey = @"local-storage";

@interface RnAuth ()<ASWebAuthenticationPresentationContextProviding>

@property (strong, nonatomic) NSUserDefaults *localStorage;

@end

@implementation RnAuth

RCT_EXPORT_MODULE(NativeRnAuth)

- (id) init {
  if (self = [super init]) {
    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
  }
  return self;
}
- (NSString * _Nullable)getItem:(NSString *)key {
  return [self.localStorage stringForKey:key];
}
- (void)setItem:(NSString *)key value:(NSString *)value {
  [self.localStorage setObject:value forKey:key];
}
- (void)removeItem:(NSString *)key {
  [self.localStorage removeObjectForKey:key];
}
- (void)clear {
  NSDictionary *keys = [self.localStorage dictionaryRepresentation];
  for (NSString *key in keys) {
    [self removeItem:key];
  }
}

- (void)login:(NSString *)url scheme:(NSString *)scheme resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  NSURL *authURL = [NSURL URLWithString:url];
  NSString *_scheme = scheme ? scheme : @"xterio-sdk-rn";
  
  ASWebAuthenticationSession *session = [[ASWebAuthenticationSession alloc] initWithURL:authURL
                                                                 callbackURLScheme:_scheme
                                                                      completionHandler:^(NSURL *callbackURL, NSError *error) {
    if (error != nil) {
      NSLog(@"[XterioAuth] Open url error");
      reject(@"XterioAuth", @"open url error", nil);
    }else{
      NSLog(@"[XterioAuth] Authenticated successfully: %@ %@", callbackURL, callbackURL.absoluteString);
      resolve(callbackURL.absoluteString);
    }
  }];
  session.presentationContextProvider = self;
  if(session.canStart){
    [session start];
  }else{
    NSLog(@"[XterioAuth] Can not open url");
    reject(@"XterioAuth", @"canot open url", nil);
  }
}

- (ASPresentationAnchor)presentationAnchorForWebAuthenticationSession:(ASWebAuthenticationSession *)session{
  __block ASPresentationAnchor anchor;
  dispatch_sync(dispatch_get_main_queue(), ^{
    anchor = [[UIApplication sharedApplication].delegate window];
  });
  return anchor;
}

- (NSNumber *)multiply:(double)a b:(double)b {
    NSNumber *result = @(a * b);
    return result;
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnAuthSpecJSI>(params);
}

@end
